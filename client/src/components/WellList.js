import React from 'react';
import './WellList.css';

function WellList({ wells, selectedWell, onView, onDelete }) {
  return (
    <div className="well-list">
      {wells.map((well) => (
        <div 
          key={well.id}
          className={`well-card ${selectedWell?.id === well.id ? 'active' : ''}`}
        >
          <div className="well-header">
            <h3>{well.wellName}</h3>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(well.id);
              }}
              className="btn-delete"
              title="Delete well"
            >
              🗑️
            </button>
          </div>
          
          <div className="well-info">
            {well.field && <p><strong>Field:</strong> {well.field}</p>}
            {well.company && <p><strong>Company:</strong> {well.company}</p>}
            <p><strong>Depth:</strong> {well.depthRange}</p>
            <p><strong>Curves:</strong> {well.curveCount}</p>
            <p className="upload-date">
              Uploaded: {new Date(well.uploadDate).toLocaleDateString()}
            </p>
          </div>

          <button 
            onClick={() => onView(well.id)}
            className="btn-view"
          >
            View Logs
          </button>
        </div>
      ))}
    </div>
  );
}

export default WellList;
