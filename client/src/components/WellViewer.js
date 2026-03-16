import React, { useState } from 'react';
import LogPlot from './LogPlot';
import './WellViewer.css';

function WellViewer({ well, onClose }) {
  const [selectedCurves, setSelectedCurves] = useState(
    well.curves.filter(c => c.name !== 'DEPT').map(c => c.name)
  );
  const [viewMode, setViewMode] = useState('plot'); // 'plot' or 'table'

  const toggleCurve = (curveName) => {
    setSelectedCurves(prev => 
      prev.includes(curveName) 
        ? prev.filter(c => c !== curveName)
        : [...prev, curveName]
    );
  };

  const getStats = (curveName) => {
    const data = well.curveData[curveName];
    if (!data || data.length === 0) return null;
    
    const values = data.filter(v => v !== null && !isNaN(v));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    
    return { min, max, avg };
  };

  return (
    <div className="well-viewer">
      <div className="viewer-header">
        <div>
          <h2>{well.wellName}</h2>
          <p className="well-meta">
            {well.field && `${well.field} | `}
            Depth: {well.startDepth} - {well.stopDepth} {well.depthUnit} | 
            Points: {well.depth.length}
          </p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={viewMode === 'plot' ? 'active' : ''}
              onClick={() => setViewMode('plot')}
            >
              📊 Plot
            </button>
            <button 
              className={viewMode === 'table' ? 'active' : ''}
              onClick={() => setViewMode('table')}
            >
              📋 Table
            </button>
          </div>
          <button onClick={onClose} className="btn-close">×</button>
        </div>
      </div>

      <div className="viewer-content">
        <div className="curve-selector">
          <h3>Curves ({selectedCurves.length})</h3>
          {well.curves.filter(c => c.name !== 'DEPT').map(curve => (
            <label key={curve.name} className="curve-checkbox">
              <input
                type="checkbox"
                checked={selectedCurves.includes(curve.name)}
                onChange={() => toggleCurve(curve.name)}
              />
              <span>{curve.name}</span>
              <span className="curve-unit">{curve.unit}</span>
            </label>
          ))}
        </div>

        <div className="data-display">
          {viewMode === 'plot' ? (
            <>
              <h3>Interactive Log Plot</h3>
              <LogPlot well={well} selectedCurves={selectedCurves} />
            </>
          ) : (
            <>
              <h3>Data Table</h3>
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Depth</th>
                      {selectedCurves.map(name => (
                        <th key={name}>{name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {well.depth.slice(0, 50).map((depth, i) => (
                      <tr key={i}>
                        <td>{depth.toFixed(4)}</td>
                        {selectedCurves.map(name => (
                          <td key={name}>
                            {well.curveData[name][i]?.toFixed(4) || 'N/A'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="table-note">
                Showing first 50 of {well.depth.length} depth points
              </p>
            </>
          )}
        </div>
      </div>

      <div className="stats-panel">
        <h3>Statistics</h3>
        {selectedCurves.map(name => {
          const stats = getStats(name);
          return stats ? (
            <div key={name} className="stat-card">
              <h4>{name}</h4>
              <div className="stat-row">
                <span>Min:</span>
                <span>{stats.min.toFixed(2)}</span>
              </div>
              <div className="stat-row">
                <span>Max:</span>
                <span>{stats.max.toFixed(2)}</span>
              </div>
              <div className="stat-row">
                <span>Avg:</span>
                <span>{stats.avg.toFixed(2)}</span>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default WellViewer;
