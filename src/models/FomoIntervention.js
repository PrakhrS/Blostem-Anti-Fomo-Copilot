const mongoose = require('mongoose');

const fomoInterventionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attemptedAsset: {
    type: String,
    required: true,
  },
  attemptedAmount: {
    type: Number,
    required: true,
  },
  fomoScore: {
    type: Number,
    required: true,
  },
  aiReasoning: {
    type: String,
    required: true,
  },
  suggestedAlternative: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  }
}, {
  timestamps: true,
});

const FomoIntervention = mongoose.model('FomoIntervention', fomoInterventionSchema);

module.exports = FomoIntervention;
