require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const postsRoutes = require('./routes/posts');
const analyticsRoutes = require('./routes/analytics');
const errorHandler = require('./middleware/errorMiddleware');

connectDB();
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/analytics', analyticsRoutes);

// health
app.get('/', (req,res) => res.send('ShopAI API running'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
