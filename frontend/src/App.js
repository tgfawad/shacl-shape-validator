import './App.css';
import React, {useState} from "react";
import FileUploader from "./components/utils/FileUploader";
import ValidationReport from "./components/reports/ValidationReport";
import {validateData} from "./network/apiCalls";

function App() {
    const [rdfData, setRdfData] = useState("");
    const [shapeRdfData, setShapeRdfData] = useState("");
    const [validationReport, setValidationReport] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleDataChange = (newData) => {
        setRdfData(newData);
    };

    const handleShapeDataChange = (newData) => {
        setShapeRdfData(newData);
    };

    return (
        <div className="shacl-validator">
            <h1>SHACL Validator</h1>
            <p><b> Content to validate </b></p>
            <FileUploader
                id="rdf-data"
                onDataChange={handleDataChange}
                acceptedFileTypes=".ttl,.rdf,.owl"
            />
            <p><b> Shapes data to validate against </b></p>
            <FileUploader
                id="shape-data"
                onDataChange={handleShapeDataChange}
                acceptedFileTypes=".ttl,.rdf,.owl"
            />

            <button
                className="validate-button"
                onClick={() => validateData(shapeRdfData, rdfData, setValidationReport, setIsLoading)}
                disabled={!rdfData || !shapeRdfData || isLoading}
            >
                {isLoading ? "Validating..." : "Validate RDF"}
            </button>

            {validationReport && (
                <ValidationReport reportData={validationReport}/>
            )}
        </div>
    );
}

export default App;