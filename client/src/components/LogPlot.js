import React from 'react';
import Plot from 'react-plotly.js';
import './LogPlot.css';

function LogPlot({ well, selectedCurves }) {
  if (!selectedCurves || selectedCurves.length === 0) {
    return (
      <div className="plot-empty">
        <p>Select at least one curve to display the plot</p>
      </div>
    );
  }

  // Create traces for each selected curve
  const traces = selectedCurves.map((curveName, index) => {
    const curveInfo = well.curves.find(c => c.name === curveName);
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'];
    
    return {
      x: well.curveData[curveName],
      y: well.depth,
      type: 'scatter',
      mode: 'lines',
      name: `${curveName} (${curveInfo?.unit || ''})`,
      line: {
        color: colors[index % colors.length],
        width: 2
      },
      xaxis: `x${index + 1}`
    };
  });

  // Create layout with multiple x-axes (one per curve)
  const layout = {
    title: {
      text: `${well.wellName} - Well Log Plot`,
      font: { size: 18 }
    },
    height: 700,
    showlegend: true,
    legend: {
      orientation: 'h',
      y: 1.1
    },
    yaxis: {
      title: `Depth (${well.depthUnit})`,
      autorange: 'reversed', // Depth increases downward
      side: 'right'
    },
    grid: {
      rows: 1,
      columns: selectedCurves.length,
      pattern: 'independent'
    },
    margin: { l: 50, r: 80, t: 100, b: 50 }
  };

  // Configure x-axes for each curve
  selectedCurves.forEach((curveName, index) => {
    const curveInfo = well.curves.find(c => c.name === curveName);
    const axisKey = index === 0 ? 'xaxis' : `xaxis${index + 1}`;
    
    layout[axisKey] = {
      title: `${curveName}<br>(${curveInfo?.unit || ''})`,
      side: 'top',
      anchor: 'y'
    };
  });

  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d']
  };

  return (
    <div className="log-plot">
      <Plot
        data={traces}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default LogPlot;
