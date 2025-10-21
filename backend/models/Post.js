const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String },
  imageUrl: { type: String },
  scheduledAt: { type: Date },
  platform: { type: String, enum: ['Instagram','Facebook','WhatsApp'], default: 'Instagram' },
  status: { type: String, enum: ['draft','scheduled','posted'], default: 'draft' },
  createdAt: { type: Date, default: Date.now },
  engagement: { type: Number, default: 0 }
});
module.exports = mongoose.model('Post', PostSchema);
