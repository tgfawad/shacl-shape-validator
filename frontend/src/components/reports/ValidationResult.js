import React from 'react';
import './ValidationResult.css';

const ValidationResult = ({ resultData }) => {
    return (
        <div className="result-card">
            <h3 className="result-title">Validation Result</h3>
            <div className="result-details">
                <p><strong>Focus Node:</strong> {resultData.focusNode}</p>
                <p><strong>Result Path:</strong> {resultData.resultPath}</p>
                <p><strong>Result Message:</strong> {resultData.resultMessage}</p>
                <p><strong>Severity:</strong> <span className={`severity ${resultData.resultSeverity.split('#')[1].toLowerCase()}`}>{resultData.resultSeverity.split('#')[1]}</span></p>
                {resultData.value && <p><strong>Value:</strong> {resultData.value}</p>}
                <p><strong>Source Constraint Component:</strong> {resultData.sourceConstraintComponent.split('#')[1]}</p>
            </div>
        </div>
    );
};

export default ValidationResult;