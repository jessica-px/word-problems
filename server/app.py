from io import BytesIO
from flask import Flask, jsonify, make_response, send_file, render_template
from server.generators.years import generate_years

app = Flask(__name__, static_folder="../client", template_folder="../client")

# -------------------------------------------------------------------------- #
#                            Frontend Endpoints                              #
# -------------------------------------------------------------------------- #
'''
    These endpoints serve bundle.js, at which points react-router takes over
    routing and displays the correct components based on the url.
'''

@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")


# -------------------------------------------------------------------------- #
#                                API Endpoints                               #
# -------------------------------------------------------------------------- #
'''
    These API endpoints can be used to GET/POST information between the
    front and back ends.
'''

@app.route('/api/years', methods=['GET'])
def get_years():
    pdf_byte_string = generate_years()
    return jsonify(pdf_byte_string)

if __name__ == '__main__':
    app.run(debug=True)
