import React, { useState, useEffect } from 'react';
import { wellsAPI } from '../services/api';
import UploadModal from './UploadModal';
import WellList from './WellList';
import WellViewer from './WellViewer';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [wells, setWells] = useState([]);
  const [selectedWell, setSelectedWell] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWells();
  }, []);

  const loadWells = async () => {
    try {
      setLoading(true);
      const data = await wellsAPI.getAll();
      setWells(data.wells);
    } catch (error) {
      console.error('Failed to load wells:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    setShowUpload(false);
    loadWells();
  };

  const handleViewWell = async (wellId) => {
    try {
      const data = await wellsAPI.getById(wellId);
      setSelectedWell(data);
    } catch (error) {
      console.error('Failed to load well:', error);
    }
  };

  const handleDeleteWell = async (wellId) => {
    if (!window.confirm('Are you sure you want to delete this well?')) return;
    
    try {
      await wellsAPI.delete(wellId);
      loadWells();
      if (selectedWell?.id === wellId) {
        setSelectedWell(null);
      }
    } catch (error) {
      console.error('Failed to delete well:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🛢️ Well Log Portal</h1>
          <span className="user-info">Welcome, {user.username}</span>
        </div>
        <div className="header-right">
          <button onClick={() => setShowUpload(true)} className="btn-upload">
            📤 Upload LAS File
          </button>
          <button onClick={onLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="sidebar">
          <h2>Wells ({wells.length})</h2>
          {loading ? (
            <p className="loading">Loading wells...</p>
          ) : wells.length === 0 ? (
            <p className="empty-state">No wells uploaded yet. Click "Upload LAS File" to get started.</p>
          ) : (
            <WellList 
              wells={wells} 
              selectedWell={selectedWell}
              onView={handleViewWell}
              onDelete={handleDeleteWell}
            />
          )}
        </div>

        <div className="main-content">
          {selectedWell ? (
            <WellViewer well={selectedWell} onClose={() => setSelectedWell(null)} />
          ) : (
            <div className="empty-viewer">
              <h2>Select a well to view log data</h2>
              <p>Choose a well from the list on the left to visualize curves and analyze data.</p>
            </div>
          )}
        </div>
      </div>

      {showUpload && (
        <UploadModal 
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}

export default Dashboard;
