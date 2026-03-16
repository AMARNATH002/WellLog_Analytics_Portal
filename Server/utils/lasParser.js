const fs = require('fs');

/**
 * Parse LAS file and extract well data
 * @param {string} filePath - Path to LAS file
 * @returns {Object} Parsed well data
 */
function parseLAS(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').map(line => line.trim());

  const result = {
    version: {},
    well: {},
    curves: [],
    data: []
  };

  let currentSection = null;
  let dataStarted = false;

  for (let line of lines) {
    // Skip empty lines and comments
    if (!line || line.startsWith('#')) continue;

    // Detect sections
    if (line.startsWith('~')) {
      dataStarted = false;
      if (line.includes('Version')) currentSection = 'version';
      else if (line.includes('Well')) currentSection = 'well';
      else if (line.includes('Curve')) currentSection = 'curve';
      else if (line.includes('ASCII') || line.includes('A ')) {
        currentSection = 'data';
        dataStarted = true;
      }
      continue;
    }

    // Parse Version section
    if (currentSection === 'version' && line.includes('.')) {
      const [key, ...rest] = line.split('.');
      const value = rest.join('.').split(':')[0].trim();
      result.version[key.trim()] = value;
    }

    // Parse Well section
    if (currentSection === 'well' && line.includes('.')) {
      const [key, ...rest] = line.split('.');
      const parts = rest.join('.').split(':');
      const value = parts[0].trim();
      const description = parts[1] ? parts[1].trim() : '';
      result.well[key.trim()] = { value, description };
    }

    // Parse Curve section
    if (currentSection === 'curve' && line.includes('.')) {
      const [name, ...rest] = line.split('.');
      const parts = rest.join('.').split(':');
      const unit = parts[0].trim();
      const description = parts[1] ? parts[1].trim() : '';
      result.curves.push({ name: name.trim(), unit, description });
    }

    // Parse Data section
    if (dataStarted && currentSection === 'data') {
      const values = line.split(/\s+/).filter(v => v);
      if (values.length > 0 && !isNaN(parseFloat(values[0]))) {
        result.data.push(values.map(v => parseFloat(v)));
      }
    }
  }

  // Convert data array to object format
  const formattedData = {
    depth: [],
    curves: {}
  };

  // Initialize curve arrays
  result.curves.forEach((curve, index) => {
    if (index === 0) return; // Skip depth (first column)
    formattedData.curves[curve.name] = [];
  });

  // Fill data
  result.data.forEach(row => {
    formattedData.depth.push(row[0]);
    result.curves.forEach((curve, index) => {
      if (index === 0) return;
      formattedData.curves[curve.name].push(row[index]);
    });
  });

  return {
    version: result.version,
    well: result.well,
    curves: result.curves,
    depth: formattedData.depth,
    curveData: formattedData.curves,
    pointCount: result.data.length
  };
}

module.exports = { parseLAS };
