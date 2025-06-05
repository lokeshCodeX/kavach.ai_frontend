import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [aadharNumber, setAadharNumber] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check if file is PDF or image
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF or image file');
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate Aadhar number (12 digits)
    if (!/^\d{12}$/.test(aadharNumber)) {
      setError('Please enter a valid 12-digit Aadhar number');
      setLoading(false);
      return;
    }

    if (!file) {
      setError('Please upload a file');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('aadharNumber', aadharNumber);
      formData.append('file', file);

      // Replace with your actual API endpoint
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Validation failed');
      }

      const data = await response.json();
      setSuccess('Document submitted successfully!');
      // Clear form
      setAadharNumber('');
      setFile(null);
      e.target.reset();
    } catch (err) {
      setError('Failed to submit document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Document Verification</h1>
        <form onSubmit={handleSubmit} className="verification-form">
          <div className="form-group">
            <label htmlFor="aadhar">Aadhar Number</label>
            <input
              type="text"
              id="aadhar"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              placeholder="Enter 12-digit Aadhar number"
              maxLength="12"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="document">Upload Document</label>
            <div className="file-upload">
              <input
                type="file"
                id="document"
                onChange={handleFileChange}
                accept=".pdf,image/*"
                required
              />
              <div className="file-info">
                {file ? (
                  <span className="file-name">{file.name}</span>
                ) : (
                  <span className="file-placeholder">
                    Choose PDF or image file
                  </span>
                )}
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit for Verification'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home; 