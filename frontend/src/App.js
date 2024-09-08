import './App.css';
import React, {useState} from "react";
import FileUploader from "./components/utils/FileUploader";
import ValidationReport from "./components/reports/ValidationReport";

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

  const validateData = async () => {
    setIsLoading(true);
    const maxRetries = 5;
    let attempts = 0;
    let success = false;

    while (attempts < maxRetries && !success) {
      try {
        const response = await fetch('http://localhost:5000/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            shapes_data: shapeRdfData,  // Path to your shapes file
            data: rdfData   // Path to your data file
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setValidationReport(result.stdout);
          success = true;
        } else {
          throw new Error('Backend not ready yet');
        }
      } catch (error) {
        console.error(error);
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 2 seconds before retrying
      }
    }
    setIsLoading(false);
    if (!success) {
      console.error('Failed to connect to backend after multiple attempts');
    }
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
            onClick={validateData}
            disabled={!rdfData || !shapeRdfData || isLoading}
        >
          {isLoading ? "Validating..." : "Validate RDF"}
        </button>

        {validationReport && (
            <ValidationReport reportData={validationReport}/>
        )}

        {/*{validationReport && (
            <div className="validation-report">
              <h2>Validation Report</h2>
              <pre>{validationReport}</pre>
            </div>
        )}*/}
      </div>
  );
}

export default App;