import tempfile

from debugpy.common.timestamp import reset
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Welcome, Backend service is up and running!"

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello, World!"})

@app.route('/validate', methods=['POST'])
def validate():
    """
    Validate route to perform SHACL validation on RDF data.
    Expects a JSON payload with 'shapes_data' and 'data' fields containing RDF shape data and RDF graph data respectively.
    Returns:
        Response: A JSON response containing the stdout, stderr, and return code from the pyshacl validation command.
    """
    shapes_data = request.json.get('shapes_data')
    graph_data = request.json.get('data')

    if not shapes_data or not graph_data:
        return jsonify({"error": "Both shapes_file and data_file are required."}), 400

    # Clean up the RDF data
    shapes_data = shapes_data.replace('\r', '')
    graph_data = graph_data.replace('\r', '')
    # Save the RDF shape data to temporary files
    # Create a temporary directory
    with tempfile.TemporaryDirectory() as temp_dir:
        shapes_file_path = os.path.join(temp_dir, 'shapes.ttl')
        data_file_path = os.path.join(temp_dir, 'datagraph.ttl')
        with open(shapes_file_path, 'w', encoding='utf-8') as shapes_file:
            shapes_file.write(shapes_data)

        # Save the RDF graph data to temporary files
        with open(data_file_path, 'w', encoding='utf-8') as data_file:
            data_file.write(graph_data)

        # Command to run pyshacl
        command = [
            'python', '-m', 'pyshacl',
            '-s', shapes_file_path, # Shapes file
            '-d', data_file_path, # Data file
            '-f', 'turtle' # return format
        ]

        # Run the command and capture the output
        result = subprocess.run(command, capture_output=True, text=True)

        print(result)
    # Return the output
    return jsonify({
        "stdout": result.stdout,
        "stderr": result.stderr,
        "returncode": result.returncode
    })

if __name__ == '__main__':
    print("Server is up and running on http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000)