# shacl-shape-validator
backend running shacl python library pyshacl. the backend is runs in docker container. the backend is responsible for validating rdf graph with shacl shape. the backend is a restful service that accepts rdf data graph and rdf shape and returns a report based on shacl validation.
call it with "http://<your-host>:5000/validate" with POST method and send the rdf data graph and rdf shape in the body of the request.
returns a report of the validation.