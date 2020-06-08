import random
import inflect
import re
from enum import Enum
from randomizer import RandomList, RandomGroup
from fpdf import FPDF, HTMLMixin

# -------------------------------------------------------------------------- #
#                                   Constants                                #
# -------------------------------------------------------------------------- #

class Frequency_Types(Enum):
    Always = 1
    Sometimes = 2
    Never = 3

inflection = inflect.engine()

NUM_SENTENCES = 10
CURRENT_YEAR = 2020
ELDEST_DOB = 1950
YOUNGEST_DOB = 2014
NUMBERS_AS_WORDS = Frequency_Types.Sometimes
EXTRA_INFORMATION = Frequency_Types.Always


name_list = RandomList([
    'James', "Tasha", "Melanie", "Bobbie", "Susanna", "Angela", "Helen", "Hana", "Ana", "Fareeha",
    "Frankie", "Christina", "Julio", "Jorge", "Pearl", "Maya", "Mia", "Nick", "Miles", "Lotta",
    "Bernie", "Frannie", "Larry", "Dahlia", "Godot", "Winston", "Hammond", "Amelie", "Jack", "Jesse",
    "Ashe", "Brigitte"
    ])

subtraction_list = RandomList([
    'ELDER_NAME is ELDER_AGE. YOUNGER_NAME is YOUNGER_AGE. (EXTRA_INFO) How many years apart are ELDER_NAME and YOUNGER_NAME?',
    'ELDER_NAME is ELDER_AGE. (EXTRA_INFO) YOUNGER_NAME is YOUNGER_AGE. How much older is ELDER_NAME than YOUNGER_NAME?',
    'ELDER_NAME is ELDER_AGE. YOUNGER_NAME is YOUNGER_AGE. (EXTRA_INFO) How much younger is YOUNGER_NAME than ELDER_NAME?',
    'ELDER_NAME is ELDER_AGE. (EXTRA_INFO) YOUNGER_NAME is YOUNGER_AGE. How old was ELDER_NAME when YOUNGER_NAME was born?',
    'YOUNGER_NAME was born in YOUNGER_DOB. (EXTRA_INFO) ELDER_NAME was born DIFFERENCE years before YOUNGER_NAME. In what year was ELDER_NAME born?',
])

addition_list = RandomList([
    'ELDER_NAME is ELDER_AGE. (EXTRA_INFO) How old will ELDER_NAME be in DIFFERENCE years?',
    'YOUNGER_NAME is YOUNGER_AGE. (EXTRA_INFO) ELDER_NAME is DIFFERENCE years older than YOUNGER_NAME. How old is ELDER_NAME?',
    'ELDER_NAME was born in ELDER_DOB. (EXTRA_INFO) YOUNGER_NAME was born DIFFERENCE years after ELDER_NAME. What year was YOUNGER_NAME born in?'
])

extra_info_list = RandomList([
    "EXTRA_NAME was born in EXTRA_YEAR.",
    "EXTRA_NAME is EXTRA_AGE years old."
])

sentences = RandomGroup([subtraction_list, addition_list])


# -------------------------------------------------------------------------- #
#                                  Person Class                              #
# -------------------------------------------------------------------------- #

class Person:
    def __init__(self):
        self.name = name_list.get_random_and_remove()
        self.dob = random.randint(ELDEST_DOB, YOUNGEST_DOB)
        self.age = CURRENT_YEAR - self.dob


# -------------------------------------------------------------------------- #
#                                     Helpers                                #
# -------------------------------------------------------------------------- #

def use_number_words():
    if NUMBERS_AS_WORDS == Frequency_Types.Sometimes:
        return random.randrange(2) == 1 # 50/50 chance True/False
    elif NUMBERS_AS_WORDS == Frequency_Types.Always:
        return True
    else:
        return False

def add_extra_info():
    if EXTRA_INFORMATION == Frequency_Types.Sometimes:
        return random.randrange(2) == 1 # 50/50 chance True/False
    elif EXTRA_INFORMATION == Frequency_Types.Always:
        return True
    else:
        return False

def replace_sentence_tokens(sentence, elder, younger):
    numbers_as_words = use_number_words()

    if (numbers_as_words):
        elder_age = inflection.number_to_words(elder.age)
        younger_age = inflection.number_to_words(younger.age)
        age_diff = inflection.number_to_words(elder.age - younger.age)
    else:
        elder_age = str(elder.age)
        younger_age = str(younger.age)
        age_diff = str(elder.age - younger.age)

    if (add_extra_info()):
        extra_info = extra_info_list.get_random()
        extra_person = Person()
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

def random_sentence():
    person1 = Person()
    person2 = Person()

    elder = person1 if person1.age > person2.age else person2
    younger = person2 if person2.age < person1.age else person1
    elder.dob -= 1 # subtracting 1 just to ensure they can't have the same age

    random_sentence = sentences.get_random()
    random_sentence = replace_sentence_tokens(random_sentence, elder, younger)

    return random_sentence


# -------------------------------------------------------------------------- #
#                                 PDF Generation                             #
# -------------------------------------------------------------------------- #

def get_sentence_list():
    sentences = []
    for i in range(1, NUM_SENTENCES+1):
        sentences.append(f'{i}. {random_sentence()}')
    return sentences


class PDF(FPDF, HTMLMixin):

    def add_title(self, title):
        # Arial 16, Bold
        self.set_font("Arial", 'B', size=16)
        # Move to the right
        self.cell(80)
        # Title
        self.cell(30, 10, title, 0, 0, 'C')
        # Line break
        self.ln(20)

    def text_line(self, txt):
        # Arial 14
        self.set_font("Arial", size=14)
        # Text
        self.multi_cell(0, 6, txt)
        # Line Break
        self.ln(12)

def generate_years():

    pdf = PDF()
    pdf.add_page()

    # Print title
    pdf.add_title('Years and Ages')
    # Print sentence list
    for sentence in get_sentence_list():
        pdf.text_line(sentence)
    latin_encoded = pdf.output(dest='S').encode('latin-1')
    base64_encoded = base64.b64encode(latin_encoded)
    return base64_encoded.decode('utf-8')
