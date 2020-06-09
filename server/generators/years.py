import random
import inflect
import re
import datetime
import json
from randomizer import RandomList, RandomGroup
from fpdf import FPDF, HTMLMixin
import base64

# -------------------------------------------------------------------------- #
#                                   Constants                                #
# -------------------------------------------------------------------------- #

inflection = inflect.engine()

data = json.load(open('server/generators/years_data.json', 'r'))
addition_sentences = data['addition_sentences']
subtraction_sentences = data['subtraction_sentences']
extra_info_sentences = data['extra_info']

names = json.load(open('server/generators/names.json', 'r'))['list']


# -------------------------------------------------------------------------- #
#                                  Person Class                              #
# -------------------------------------------------------------------------- #

class Person:
    def __init__(self, name, age_range):
        self.name = name
        self.age = random.randint(age_range[0], age_range[1])
        self.dob = datetime.datetime.now().year - self.age


# -------------------------------------------------------------------------- #
#                                     Helpers                                #
# -------------------------------------------------------------------------- #

def add_extra_info(use_extra_info):
    if use_extra_info == 'Never':
        return False
    elif use_extra_info == 'Always':
        return True
    else:
        return random.randrange(2) == 1 # 50/50 chance True/False

def use_words_for_numbers(number_type):
    if (number_type == 'Numbers Only'):
        return False
    elif (number_type == 'Words Only'):
        return True
    else:
        return random.randrange(2) == 1 # 50/50 chance True/False

def replace_sentence_tokens(sentence, elder, younger, names_list, input_data):
    # Display numbers or words or a mix
    numbers_as_words = use_words_for_numbers(input_data['number_type'])

    if (numbers_as_words):
        elder_age = inflection.number_to_words(elder.age)
        younger_age = inflection.number_to_words(younger.age)
        age_diff = inflection.number_to_words(elder.age - younger.age)
    else:
        elder_age = str(elder.age)
        younger_age = str(younger.age)
        age_diff = str(elder.age - younger.age)

    # Include "extra info" or not
    if (add_extra_info(input_data['extra_info'])):
        extra_info = RandomList(extra_info_sentences).get_random()
        extra_person = Person(names_list.get_random_and_remove(), input_data['age_range'])
        extra_name = extra_person.name
        extra_age = inflection.number_to_words(extra_person.age) if numbers_as_words else str(extra_person.age)
        extra_year = str(extra_person.dob)
    else:
        extra_info = ""
        extra_name = ""
        extra_age = ""
        extra_year = ""

    replacements = [
        (r'\(EXTRA_INFO\)', extra_info),
        ('EXTRA_NAME', extra_name),
        ('EXTRA_AGE', extra_age),
        ('EXTRA_YEAR', extra_year),
        ('ELDER_NAME', elder.name),
        ('YOUNGER_NAME', younger.name),
        ('ELDER_AGE', elder_age),
        ('YOUNGER_AGE', younger_age),
        ('ELDER_DOB', str(elder.dob)),
        ('YOUNGER_DOB', str(younger.dob)),
        ('DIFFERENCE', age_diff),
    ]

    for old, new in replacements:
        sentence = re.sub(old, new, sentence)
    return sentence

# -------------------------------------------------------------------------- #
#                               Sentence Generation                          #
# -------------------------------------------------------------------------- #

def random_sentence(input_data):
    # Create people
    names_list = RandomList(names)
    name1 = names_list.get_random_and_remove()
    name2 = names_list.get_random_and_remove()
    person1 = Person(name1, input_data['age_range'])
    person2 = Person(name2, input_data['age_range'])

    elder = person1 if person1.age > person2.age else person2
    younger = person2 if person2.age < person1.age else person1
    younger.age -= 2 # subtracting 2 just to ensure there's at least a two year difference

    # Get sentences
    addition_only = input_data['math_type'] == 'Addition Only'
    subtraction_only = input_data['math_type'] == 'Subtraction Only'

    if addition_only:
        sentence_list = RandomList(addition_sentences)
    elif subtraction_only:
        sentence_list = RandomList(subtraction_sentences)
    else:
        sentence_list = RandomGroup([RandomList(addition_sentences), RandomList(subtraction_sentences)])

    random_sentence = sentence_list.get_random()
    random_sentence = replace_sentence_tokens(random_sentence, elder, younger, names_list, input_data)

    return random_sentence


# -------------------------------------------------------------------------- #
#                                 PDF Generation                             #
# -------------------------------------------------------------------------- #

def get_sentence_list(input_data):
    num_problems = input_data['num_problems']
    sentences = []
    for i in range(1, num_problems+1):
        sentences.append(f'{i}. {random_sentence(input_data)}')
    return sentences


class PDF(FPDF, HTMLMixin):

    def add_title(self, title):
        # Arial 16, Bold
        self.set_font("Arial", 'B', size=14)
        # Move to the right
        self.cell(80)
        # Title
        self.cell(30, 10, title, 0, 0, 'C')
        # Move to the right
        self.cell(30)
        # Name Field
        self.set_font("Arial", size=11) # Arial 12
        self.cell(30, 10, 'Name ______________________', 0, 0, 'C')
        # Line break
        self.ln(20)

    def text_line(self, txt, num_problems):
        # Arial 14
        self.set_font("Arial", size=self.get_font_size(num_problems))
        # Text
        self.multi_cell(0, 6, txt)
        # Line Break
        self.ln(self.get_line_spacing(num_problems))

    def get_font_size(self, num_problems):
        if num_problems < 10:
            return 14
        elif num_problems < 12:
            return 12
        else: # is 12
            return 11

    def get_line_spacing(self, num_problems):
        if num_problems < 7:
            return 25
        elif num_problems < 10:
            return 16
        elif num_problems < 12:
            return 10
        else: # is 12
            return 9

def generate_years(input_data):
    pdf = PDF()
    pdf.add_page()
    pdf.set_margins(16, 20, 16)
    num_problems = input_data['num_problems']

    # Print title
    pdf.add_title('Years and Ages')
    # Print sentence list
    for sentence in get_sentence_list(input_data):
        pdf.text_line(sentence, num_problems)
    latin_encoded = pdf.output(dest='S').encode('latin-1')
    base64_encoded = base64.b64encode(latin_encoded)
    return base64_encoded.decode('utf-8')
