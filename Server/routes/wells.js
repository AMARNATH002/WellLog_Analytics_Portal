const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Well = require('../models/Well');
const auth = require('../middleware/auth');
const { parseLAS } = require('../utils/lasParser');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.las') {
      cb(null, true);
    } else {
      cb(new Error('Only .las files are allowed'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload LAS file
router.post('/upload', auth, upload.single('lasFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse LAS file
    const parsedData = parseLAS(req.file.path);

    // Create well document
    const well = new Well({
      wellName: parsedData.well.WELL?.value || 'Unknown',
      field: parsedData.well.FLD?.value || '',
      company: parsedData.well.COMP?.value || '',
      location: parsedData.well.LOC?.value || '',
      startDepth: parseFloat(parsedData.well.STRT?.value) || 0,
      stopDepth: parseFloat(parsedData.well.STOP?.value) || 0,
      step: parseFloat(parsedData.well.STEP?.value) || 0,
      depthUnit: parsedData.well.STRT?.value?.match(/[A-Z]+/)?.[0] || 'M',
      curves: parsedData.curves,
      depth: parsedData.depth,
      curveData: parsedData.curveData,
      uploadedBy: req.user.userId,
      fileName: req.file.originalname
    });

    await well.save();

    // Clean up uploaded file (optional - keep if you want to store originals)
    // fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: 'Well data uploaded successfully',
      well: {
        id: well._id,
        wellName: well.wellName,
        field: well.field,
        pointCount: parsedData.pointCount,
        curves: well.curves.map(c => c.name)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all wells
router.get('/', auth, async (req, res) => {
  try {
    const wells = await Well.find()
      .select('wellName field company startDepth stopDepth uploadDate curves')
      .sort({ uploadDate: -1 });

    res.json({
      count: wells.length,
      wells: wells.map(w => ({
        id: w._id,
        wellName: w.wellName,
        field: w.field,
        company: w.company,
        depthRange: `${w.startDepth} - ${w.stopDepth}`,
        uploadDate: w.uploadDate,
        curveCount: w.curves.length
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific well data
router.get('/:id', auth, async (req, res) => {
  try {
    const well = await Well.findById(req.params.id);
    
    if (!well) {
      return res.status(404).json({ error: 'Well not found' });
    }

    res.json({
      id: well._id,
      wellName: well.wellName,
      field: well.field,
      company: well.company,
      location: well.location,
      startDepth: well.startDepth,
      stopDepth: well.stopDepth,
      step: well.step,
      depthUnit: well.depthUnit,
      curves: well.curves,
      depth: well.depth,
      curveData: Object.fromEntries(well.curveData),
      uploadDate: well.uploadDate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete well
router.delete('/:id', auth, async (req, res) => {
  try {
    const well = await Well.findByIdAndDelete(req.params.id);
    
    if (!well) {
      return res.status(404).json({ error: 'Well not found' });
    }

    res.json({ message: 'Well deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
