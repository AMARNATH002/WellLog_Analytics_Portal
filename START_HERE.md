# 🚀 START HERE - Complete Setup Guide

## What You're Building
A web portal where geologists can upload well log files (LAS format) and visualize subsurface data with interactive charts.

---

## STEP 1: Install MongoDB (Choose One Option)

### Option A: MongoDB Atlas (Cloud - EASIEST, RECOMMENDED)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account (use Google/GitHub for quick signup)
4. Create a FREE cluster:
   - Choose AWS
   - Select closest region
   - Cluster Name: "WellLogCluster"
   - Click "Create"
5. Wait 3-5 minutes for cluster creation
6. Click "Connect" button
7. Add IP Address: Click "Add Current IP Address"
8. Create Database User:
   - Username: `wellloguser`
   - Password: `welllog123` (or your choice)
   - Click "Create Database User"
9. Click "Choose connection method" → "Connect your application"
10. Copy the connection string (looks like):
    ```
    mongodb+srv://wellloguser:<password>@cluster.mongodb.net/
    ```
11. Replace `<password>` with your actual password
12. Open `server/.env` file and update:
    ```
    MONGODB_URI=mongodb+srv://wellloguser:welllog123@cluster.mongodb.net/welllog-db
    ```

### Option B: Local MongoDB (If you prefer local)
**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB runs automatically
4. Keep default in `server/.env`: `MONGODB_URI=mongodb://localhost:27017/welllog-db`

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt install mongodb
sudo systemctl start mongodb
```

---

## STEP 2: Start Backend Server

Open terminal/command prompt:

```bash
# Navigate to server folder
cd server

# Install dependencies (first time only)
npm install

# Start server
npm start
```

**Expected Output:**
```
🚀 Server running on port 5000
✅ MongoDB Connected: cluster.mongodb.net
📍 Health check: http://localhost:5000/api/health
```

**If you see errors:**
- MongoDB connection error → Check your MONGODB_URI in .env
- Port 5000 in use → Change PORT=5001 in .env
- npm not found → Install Node.js from nodejs.org

**Keep this terminal open!**

---

## STEP 3: Start Frontend

Open a NEW terminal (keep backend running):

```bash
# Navigate to client folder
cd client

# Install dependencies (first time only)
npm install

# Start React app
npm start
```

**Expected Output:**
```
Compiled successfully!
Local: http://localhost:3000
```

Browser will automatically open to http://localhost:3000

**If you see errors:**
- Port 3000 in use → It will ask to use 3001, say yes
- npm install fails → Delete node_modules folder and try again

---

## STEP 4: Use the Application

### 1. Register Account
- You'll see a login page
- Click "Register" at the bottom
- Enter:
  - Username: `geologist1` (min 3 characters)
  - Password: `test123` (min 6 characters)
- Click "Register"
- You'll be logged in automatically

### 2. Upload Sample LAS File
- Click the blue "📤 Upload LAS File" button (top right)
- Click "Click to select LAS file"
- Navigate to your project folder → `docs` → `SAMPLE_LAS.las`
- Select the file
- Click "Upload"
- Wait for success message
- Modal closes automatically

### 3. View Well Data
- You'll see "WELL-001" in the left sidebar
- Click "View Logs" button
- Main area shows:
  - Well name and metadata
  - Curve checkboxes (GR, RESDEEP, NPHI, RHOB)
  - Data table with first 10 rows
  - Statistics cards (min, max, avg)

### 4. Explore Features
- **Toggle Curves:** Uncheck/check curves to show/hide in table
- **View Stats:** See min, max, average for each curve
- **Delete Well:** Click 🗑️ icon on well card
- **Upload More:** Upload additional LAS files
- **Logout:** Click "Logout" button (top right)

---

## STEP 5: Test with Your Own LAS Files

### Where to Get Real LAS Files:

**Option 1: USGS (US Geological Survey)**
1. Go to: https://www.usgs.gov/ngdp
2. Search for "well logs"
3. Download LAS files

**Option 2: Equinor Volve Dataset**
1. Go to: https://www.equinor.com/energy/volve-data-sharing
2. Register (free)
3. Download well log data
4. Extract LAS files

**Upload Process:**
1. Click "Upload LAS File"
2. Select your downloaded .las file
3. Click "Upload"
4. View the well data

---

## Troubleshooting

### Backend Issues

**Problem: "MongoDB connection failed"**
```
Solution:
1. Check internet connection (for Atlas)
2. Verify MONGODB_URI in server/.env
3. Check username/password are correct
4. Whitelist your IP in Atlas (Security → Network Access)
```

**Problem: "Port 5000 already in use"**
```
Solution:
1. Open server/.env
2. Change: PORT=5001
3. Restart server
4. Update client/src/services/api.js:
   const API_URL = 'http://localhost:5001/api';
```

**Problem: "Cannot find module 'express'"**
```
Solution:
cd server
rm -rf node_modules
npm install
```

### Frontend Issues

**Problem: "Failed to fetch" or "Network Error"**
```
Solution:
1. Check backend is running (terminal 1)
2. Check URL: http://localhost:5000/api/health
3. Should return: {"status":"OK"}
4. Clear browser cache (Ctrl+Shift+Delete)
```

**Problem: "Invalid credentials" on login**
```
Solution:
1. Click "Register" instead of "Login"
2. Create new account
3. Or check username/password spelling
```

**Problem: Upload fails**
```
Solution:
1. Check file is .las extension
2. Check file size < 10MB
3. Check backend terminal for errors
4. Try sample file first: docs/SAMPLE_LAS.las
```

### Browser Console Errors

**How to check:**
1. Press F12 (or right-click → Inspect)
2. Click "Console" tab
3. Look for red errors
4. Share error message for help

---

## Quick Test Commands

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```
Expected: `{"status":"OK",...}`

### Test MongoDB Connection
Check backend terminal for:
```
✅ MongoDB Connected: ...
```

### Test Frontend
Open browser to: http://localhost:3000
Should see login page (not blank screen)

---

## What Each File Does

```
well-log-portal/
├── server/                    # Backend API
│   ├── server.js             # Main entry point - START HERE
│   ├── .env                  # Configuration (MongoDB URL, etc)
│   ├── models/               # Database schemas
│   ├── routes/               # API endpoints
│   ├── utils/lasParser.js    # Reads LAS files
│   └── package.json          # Dependencies list
│
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── App.js            # Main component
│   │   ├── components/       # UI components
│   │   └── services/api.js   # API calls
│   └── package.json          # Dependencies list
│
└── docs/
    └── SAMPLE_LAS.las        # Test data file
```

---

## Video Tutorial (If Stuck)

Search YouTube for:
- "How to setup MongoDB Atlas"
- "MERN stack tutorial"
- "React Node.js full stack"

---

## Next Steps After Basic Setup Works

1. ✅ Get basic app running (you are here)
2. Add interactive Plotly charts (depth vs curves)
3. Add depth interval selection
4. Add zone highlighting
5. Deploy to cloud (Vercel + Railway)

---

## Need Help?

**Check these in order:**
1. Is MongoDB connected? (check backend terminal)
2. Is backend running? (visit http://localhost:5000/api/health)
3. Is frontend running? (visit http://localhost:3000)
4. Any errors in browser console? (press F12)
5. Any errors in backend terminal?

**Common mistakes:**
- Forgot to run `npm install`
- Backend not running when testing frontend
- Wrong MongoDB connection string
- Firewall blocking ports 3000 or 5000

---

## Success Checklist

- [ ] MongoDB connected (see ✅ in backend terminal)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can register new user
- [ ] Can upload SAMPLE_LAS.las
- [ ] Can see well in sidebar
- [ ] Can view well data
- [ ] Can see statistics

**All checked? Congratulations! 🎉 Your app is working!**

Now show it to your mentor and discuss adding charts!
