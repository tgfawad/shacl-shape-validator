import React, { useEffect, useState } from 'react';
import ValidationResult from './ValidationResult';
import { Parser } from 'n3';
import './ValidationReport.css';

/**
 * Component for uploading RDF files or directly inputting RDF data.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier for the file uploader.
 * @param {function} props.onDataChange - Callback function to handle changes in the RDF data.
 * @param {string} [props.acceptedFileTypes='.ttl,.rdf,.owl'] - The accepted file types for upload.
 */
const ValidationReport = ({ reportData }) => {
    const [report, setReport] = useState(null);

    useEffect(() => {
        const parser = new Parser();
        const quads = [];

        // Parse the report data and extract the validation results
        parser.parse(reportData, (error, quad, prefixes) => {
            if (quad) {
                quads.push(quad);
            } else {
                const conformsQuad = quads.find(q => q.predicate.value === 'http://www.w3.org/ns/shacl#conforms');
                const resultQuads = quads.filter(q => q.predicate.value === 'http://www.w3.org/ns/shacl#result');

                const results = resultQuads.map(resultQuad => {
                    const resultNode = resultQuad.object;
                    const resultDetails = quads.filter(q => q.subject.equals(resultNode));
                    const resultObj = {};

                    resultDetails.forEach(detail => {
                        const predicate = detail.predicate.value.split('#')[1];
                        resultObj[predicate] = detail.object.value;
                    });

                    return resultObj;
                });

                setReport({
                    conforms: conformsQuad ? conformsQuad.object.value === 'true' : false,
                    results: results
                });
            }
        });
    }, [reportData]);

    if (!report) return <div>Loading...</div>;

    return (
        <div className="report-container">
            <h2 className="report-title">Validation Report</h2>
            <p className="conformance">
                Conforms: <span className={report.conforms ? 'conforms' : 'violates'}>
                    {report.conforms ? 'Yes' : 'No'}
                </span>
            </p>
            <div className="results-list">
                {report.results.map((result, index) => (
                    <ValidationResult key={index} resultData={result} />
                ))}
            </div>
        </div>
    );
};

export default ValidationReport;