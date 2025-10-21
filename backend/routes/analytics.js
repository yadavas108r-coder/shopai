const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Post = require('../models/Post');

router.get('/', protect, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ userId });
    // Simple stats
    const total = posts.length;
    const engagementRate = total ? ((posts.reduce((s,p)=>s+(p.engagement||0),0)/total)).toFixed(2) : 0;
    const topPost = posts.sort((a,b)=> (b.engagement||0)-(a.engagement||0))[0] || null;
    // followers growth fake timeseries demo (frontend can mock)
    const followersGrowth = posts.slice(0,10).map((p,i)=> ({ date: p.createdAt, followers: 100 + i*5 + (p.engagement||0)}) );
    res.json({ total, engagementRate, topPost, followersGrowth });
  } catch (err) { next(err); }
});

module.exports = router;
