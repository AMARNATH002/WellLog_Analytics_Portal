import React, { useState } from 'react';
import { wellsAPI } from '../services/api';
import './UploadModal.css';

function UploadModal({ onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.las')) {
        setError('Please select a .las file');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError('');

    try {
      await wellsAPI.upload(file);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload LAS File</h2>
          <button onClick={onClose} className="btn-close">×</button>
        </div>

        <div className="modal-body">
          <div className="upload-area">
            <input
              type="file"
              accept=".las"
              onChange={handleFileChange}
              id="file-input"
              className="file-input"
            />
            <label htmlFor="file-input" className="file-label">
              {file ? (
                <>
                  <span className="file-icon">📄</span>
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </>
              ) : (
                <>
                  <span className="upload-icon">📁</span>
                  <span>Click to select LAS file</span>
                  <span className="hint">or drag and drop</span>
                </>
              )}
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="info-box">
            <strong>LAS File Format:</strong>
            <ul>
              <li>Industry-standard well log format</li>
              <li>Contains depth and curve measurements</li>
              <li>Sample file available in docs/SAMPLE_LAS.las</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button 
            onClick={handleUpload} 
            disabled={!file || uploading}
            className="btn-primary"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
