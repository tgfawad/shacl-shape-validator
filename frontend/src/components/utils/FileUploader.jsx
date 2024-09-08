import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { turtle } from '@codemirror/legacy-modes/mode/turtle';
import './FileUploader.css';

const FileUploader = ({ id, onDataChange, acceptedFileTypes = '.ttl,.rdf,.owl' }) => {
    const [rdfData, setRdfData] = useState("");
    const [fileName, setFileName] = useState(null);

    const handleDirectInput = useCallback((value, viewUpdate) => {
        setRdfData(value);
        onDataChange(value);
    }, [onDataChange]);

    const handleFileContent = useCallback((content) => {
        setRdfData(content);
        onDataChange(content);
    }, [onDataChange]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => handleFileContent(e.target.result);
            reader.readAsText(file);
            setFileName(file.name);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => handleFileContent(e.target.result);
            reader.readAsText(file);
        }
    };

    const handleRemoveFile = () => {
        setFileName(null);
        setRdfData("");
        onDataChange("");
    };

    return (
        <div className="file-upload-container">
            <div className="file-upload">
                <input
                    type="file"
                    id={`file-upload-${id}`}
                    onChange={handleFileUpload}
                    accept={acceptedFileTypes}
                    className="file-input"
                />
                <label htmlFor={`file-upload-${id}`} className="upload-label">
                    <span className="browse-button">Browse Files</span>
                    {fileName && (
                        <span className="file-name">
                            {fileName}
                            <button onClick={handleRemoveFile} className="remove-button">Remove</button>
                        </span>
                    )}
                </label>
            </div>
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="code-editor-container"
            >
                <CodeMirror
                    value={rdfData}
                    height="200px"
                    extensions={[StreamLanguage.define(turtle)]}
                    onChange={handleDirectInput}
                    className="code-editor"
                    placeholder={"Or Drop file here or paste RDF data or write your RDF data here"}
                />
            </div>
        </div>
    );
};

FileUploader.propTypes = {
    onDataChange: PropTypes.func.isRequired,
    acceptedFileTypes: PropTypes.string
};

export default FileUploader;