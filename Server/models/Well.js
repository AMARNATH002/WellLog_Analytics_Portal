const mongoose = require('mongoose');

const wellSchema = new mongoose.Schema({
  wellName: {
    type: String,
    required: true,
    trim: true
  },
  field: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  startDepth: {
    type: Number,
    required: true
  },
  stopDepth: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    required: true
  },
  depthUnit: {
    type: String,
    default: 'M'
  },
  curves: [{
    name: String,
    unit: String,
    description: String
  }],
  depth: [Number],
  curveData: {
    type: Map,
    of: [Number]
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  fileName: String
});

module.exports = mongoose.model('Well', wellSchema);
