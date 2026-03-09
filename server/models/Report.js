import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  repoUrl:    { type: String, required: true },
  owner:      String,
  repoName:   String,
  score:      Number,
  breakdown:  Object,
  strengths:  [String],
  warnings:   [String],
  languages:  Object,
  repoInfo:   Object,
  analyzedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Report', reportSchema);