# API Testing Guide 🧪

## Prerequisites
1. Install MongoDB locally OR use MongoDB Atlas
2. Install dependencies: `cd server && npm install`
3. Start server: `npm start`

## Test Endpoints

### 1. Health Check ✅
```bash
curl http://localhost:5000/api/health
```

Expected:
```json
{
  "status": "OK",
  "message": "Well Log API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Register User 👤
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "geologist1",
    "password": "password123",
    "role": "geologist"
  }'
```

Expected:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "username": "geologist1",
    "role": "geologist"
  }
}
```

**Save the token!** You'll need it for authenticated requests.

### 3. Login 🔐
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "geologist1",
    "password": "password123"
  }'
```

### 4. Upload LAS File 📤
```bash
curl -X POST http://localhost:5000/api/wells/upload \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "lasFile=@docs/SAMPLE_LAS.las"
```

Replace `YOUR_TOKEN_HERE` with the token from register/login.

Expected:
```json
{
  "message": "Well data uploaded successfully",
  "well": {
    "id": "...",
    "wellName": "WELL-001",
    "field": "TEST FIELD",
    "pointCount": 11,
    "curves": ["DEPT", "GR", "RESDEEP", "NPHI", "RHOB"]
  }
}
```

### 5. Get All Wells 📋
```bash
curl http://localhost:5000/api/wells \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Expected:
```json
{
  "count": 1,
  "wells": [
    {
      "id": "...",
      "wellName": "WELL-001",
      "field": "TEST FIELD",
      "company": "EXAMPLE",
      "depthRange": "1670 - 1669.75",
      "uploadDate": "2024-01-15T10:30:00.000Z",
      "curveCount": 5
    }
  ]
}
```

### 6. Get Specific Well Data 📊
```bash
curl http://localhost:5000/api/wells/WELL_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Replace `WELL_ID_HERE` with the ID from previous response.

Expected: Full well data including depth array and all curve values.

### 7. Delete Well 🗑️
```bash
curl -X DELETE http://localhost:5000/api/wells/WELL_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Using Postman/Thunder Client (Easier!)

### Setup
1. Install Thunder Client extension in VS Code OR Postman
2. Create new collection "Well Log API"

### Test Sequence
1. **Register** → Save token
2. **Upload LAS** → Save well ID
3. **Get Wells** → Verify upload
4. **Get Well by ID** → See full data

## MongoDB Setup Options

### Option 1: Local MongoDB
```bash
# Install MongoDB Community Edition
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt install mongodb

# Start MongoDB
mongod
```

### Option 2: MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (free tier)
4. Get connection string
5. Update `server/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/welllog-db
```

## Troubleshooting

### Error: "MongoDB connection failed"
- Check if MongoDB is running: `mongosh` (should connect)
- Or use MongoDB Atlas connection string

### Error: "No authentication token"
- Make sure to include `Authorization: Bearer TOKEN` header
- Token must be from register/login response

### Error: "Only .las files allowed"
- File must have .las extension
- Check file path in curl command

### Error: "Port 5000 already in use"
- Change PORT in .env file
- Or kill process: `lsof -ti:5000 | xargs kill` (Mac/Linux)

## What's Working Now? ✅

- ✅ User registration & login with JWT
- ✅ LAS file parsing (extracts depth, curves, metadata)
- ✅ MongoDB storage (well data as documents)
- ✅ Protected API endpoints
- ✅ File upload with validation
- ✅ CRUD operations for wells

## Next Steps

1. Test all endpoints with sample LAS file
2. Build React frontend for upload UI
3. Add Plotly.js for visualization
4. Implement analytics endpoints

## Quick Test Script

Save as `test.sh`:
```bash
#!/bin/bash

echo "1. Health Check"
curl http://localhost:5000/api/health
echo "\n\n"

echo "2. Register User"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test1","password":"test123"}')
echo $RESPONSE
TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "\n\n"

echo "3. Upload LAS"
curl -X POST http://localhost:5000/api/wells/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "lasFile=@docs/SAMPLE_LAS.las"
echo "\n\n"

echo "4. Get Wells"
curl http://localhost:5000/api/wells \
  -H "Authorization: Bearer $TOKEN"
```

Run: `bash test.sh`
