from io import BytesIO
from flask import Flask, jsonify, make_response, send_file
from server.generators.years import generate_years

app = Flask(__name__)

# -------------------------------------------------------------------------- #
#                             Frontend Endpoint                              #
# -------------------------------------------------------------------------- #

@app.route('/')
def index():
    return "Hello, World!"


# -------------------------------------------------------------------------- #
#                                API Endpoints                               #
# -------------------------------------------------------------------------- #

@app.route('/api/years', methods=['GET'])
def get_years():
    pdf_byte_string = generate_years()
    return jsonify(pdf_byte_string)

if __name__ == '__main__':
    app.run(debug=True)
