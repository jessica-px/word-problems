from io import BytesIO
from flask import Flask, jsonify, make_response, send_file, render_template
from server.generators.years import generate_years

app = Flask(__name__, static_folder="../client", template_folder="../client")

# -------------------------------------------------------------------------- #
#                             Frontend Endpoint                              #
# -------------------------------------------------------------------------- #

@app.route("/")
def index():
    return render_template("index.html")


# -------------------------------------------------------------------------- #
#                                API Endpoints                               #
# -------------------------------------------------------------------------- #

@app.route('/api/years', methods=['GET'])
def get_years():
    pdf_byte_string = generate_years()
    return jsonify(pdf_byte_string)

if __name__ == '__main__':
    app.run(debug=True)
