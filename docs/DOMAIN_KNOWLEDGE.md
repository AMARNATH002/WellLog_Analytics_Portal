# Domain Knowledge: Well Logging & LAS Files

## What is Well Logging? 🛢️

Well logging is the practice of making detailed records (logs) of geological formations penetrated by a drilling well. These measurements help geologists understand:
- Rock types (sandstone, shale, limestone)
- Fluid content (oil, gas, water)
- Reservoir quality (porosity, permeability)

## Common Log Types

### 1. Gamma Ray (GR)
- **Measures:** Natural radioactivity in rocks
- **Unit:** API (American Petroleum Institute units)
- **Use:** Identify shale (high GR) vs clean sand (low GR)
- **Typical Range:** 0-150 API

### 2. Resistivity
- **Measures:** Electrical resistance of rock
- **Unit:** ohm-m (ohm-meters)
- **Use:** Detect hydrocarbons (high resistivity) vs water (low resistivity)
- **Typical Range:** 0.2-2000 ohm-m

### 3. Porosity Logs
- **Neutron Porosity (NPHI):** Hydrogen content
- **Density Porosity (DPHI):** Bulk density
- **Unit:** % or v/v (volume/volume)
- **Use:** Estimate pore space for fluid storage
- **Typical Range:** 0-40%

## LAS File Format

### Structure
```
~Version Information
VERS. 2.0 : CWLS LOG ASCII STANDARD - VERSION 2.0
WRAP. NO  : ONE LINE PER DEPTH STEP

~Well Information
STRT.M    1670.0 : START DEPTH
STOP.M    1669.75: STOP DEPTH
STEP.M    -0.125 : STEP
NULL.     -999.25: NULL VALUE
WELL.     WELL-001: WELL NAME

~Curve Information
DEPT.M    : Depth
GR.API    : Gamma Ray
RESDEEP.OHMM : Deep Resistivity
NPHI.V/V  : Neutron Porosity

~ASCII
1670.0000  45.2  12.5  0.25
1669.8750  47.1  13.2  0.26
1669.7500  48.5  14.1  0.27
```

### Sections Explained
1. **~Version:** File format version
2. **~Well:** Metadata (well name, depth range, units)
3. **~Curve:** Column definitions (name, unit, description)
4. **~ASCII:** Actual data (space or comma separated)

## Real-World Workflow

1. **Drilling:** Well is drilled to target depth
2. **Logging:** Tools lowered into well to measure properties
3. **Data Export:** Measurements saved as LAS file
4. **Interpretation:** Geologist analyzes curves to identify zones
5. **Decision:** Determine if zone is productive (oil/gas bearing)

## Why This Project Matters

Currently, geologists often:
- Email LAS files back and forth
- Use desktop software (not web-based)
- Lack centralized storage
- Can't quickly share interpretations

Your portal solves this by providing:
- ✅ Web-based access (no software installation)
- ✅ Centralized database
- ✅ Quick visualization
- ✅ Basic analytics built-in

## Learning Resources

### Videos
- Search YouTube: "Introduction to Well Logging"
- Search YouTube: "How to read LAS files"

### Datasets
- **USGS:** https://www.usgs.gov/ngdp
- **Equinor Volve:** https://www.equinor.com/energy/volve-data-sharing

### Standards
- **CWLS (Canadian Well Logging Society):** LAS format specification
- Download from: https://www.cwls.org/products/
