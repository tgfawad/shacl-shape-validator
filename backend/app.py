from debugpy.common.timestamp import reset
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Welcome, Backend service is up and running!"

@app.route('/validate', methods=['POST'])
def validate():
    # Get the data from the request that is coming from the frontend or Rest call
    shapes_data = request.json.get('shapes_data')
    graph_data = request.json.get('data')

    if not shapes_data or not graph_data:
        return jsonify({"error": "Both shapes_file and data_file are required."}), 400

    # Save the RDF shape data to temporary files
    with open('/data/shapes.ttl', 'w') as shapes_file:
        shapes_file.write(shapes_data)

    # Save the RDF graph data to temporary files
    with open('/data/datagraph.ttl', 'w') as data_file:
        data_file.write(graph_data)

    # Command to run pyshacl
    command = [
        'python', '-m', 'pyshacl',
        '-s', '/data/shapes.ttl', # Shapes file
        '-d', '/data/datagraph.ttl', # Data file
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