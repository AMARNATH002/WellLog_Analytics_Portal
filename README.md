# Well Log Management Portal 🛢️

## Problem Statement
An internal web portal for geoscientists to upload, view, and analyze well log data (LAS files) for formation evaluation.

## What Are We Building?
- **Upload:** Geologists upload LAS files (industry-standard well log format)
- **Visualize:** Interactive plots showing depth vs multiple log curves (GR, Resistivity, Porosity)
- **Analyze:** Basic analytics like average values, zone identification

## Tech Stack
- **Frontend:** React + Plotly.js (for interactive charts)
- **Backend:** Node.js + Express
- **Database:** MongoDB (stores well metadata + log curves)
- **Auth:** JWT (simple login for internal users)

## Domain Knowledge Required
### What is Well Logging?
Measurements taken inside oil/gas wells to understand subsurface rock properties.

### What is LAS Format?
ASCII text file with:
- Header section (well info, curve names)
- Data section (depth + curve values in columns)

### Key Log Types
- **GR (Gamma Ray):** Measures natural radioactivity → identifies shale vs sand
- **Resistivity:** Measures rock resistance → indicates hydrocarbons
- **Porosity:** Measures pore space → storage capacity

## Data Sources for Testing
1. **USGS National Geological Data:** https://www.usgs.gov/ngdp
2. **Equinor Volve Field:** https://www.equinor.com/energy/volve-data-sharing

## Project Structure
```
well-log-portal/
├── client/              # React frontend
├── server/              # Express backend
│   ├── config/          # DB connection, env vars
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, file upload
│   ├── utils/           # LAS parser
│   └── server.js        # Entry point
├── docs/                # Learning resources, sample LAS files
└── README.md
```

## Current Phase: Initialization ✅
Setting up basic project structure with minimal dependencies.

## Next Steps
1. Initialize backend with Express
2. Create simple "Hello World" API
3. Connect MongoDB
4. Test with sample LAS file parsing
5. Build basic React upload UI

## How to Run (After Setup)
```bash
# Backend
cd server
npm install
npm start

# Frontend
cd client
npm start
```

## Learning Resources
- LAS Format Specification: https://www.cwls.org/products/
- Well Logging Basics: Search "Introduction to Well Logging" on YouTube
- Sample LAS files: Will be added to `docs/sample-data/`
