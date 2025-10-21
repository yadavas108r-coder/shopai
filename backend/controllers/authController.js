const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, shopName } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User exists' });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashed, shopName });
    res.json({ token: genToken(user._id), user: { id: user._id, email: user.email, shopName: user.shopName }});
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, u.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ token: genToken(u._id), user: { id: u._id, email: u.email, shopName: u.shopName }});
  } catch (err) { next(err); }
};
