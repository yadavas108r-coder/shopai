const Post = require('../models/Post');

exports.createPost = async (req,res,next) => {
  try {
    const userId = req.user._id;
    const { caption, imageUrl, scheduledAt, platform, status } = req.body;
    const p = await Post.create({ userId, caption, imageUrl, scheduledAt, platform, status });
    res.json(p);
  } catch (err) { next(err); }
};

exports.getPosts = async (req,res,next) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ userId }).sort({ scheduledAt: -1, createdAt: -1 });
    res.json(posts);
  } catch (err) { next(err); }
};

exports.updatePost = async (req,res,next) => {
  try {
    const { id } = req.params;
    const u = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.json(u);
  } catch (err) { next(err); }
};

exports.deletePost = async (req,res,next) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
