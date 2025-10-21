const { Configuration, OpenAIApi } = require('openai');
const Post = require('../models/Post');

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

// POST /api/generate-caption
exports.generateCaption = async (req, res, next) => {
  try {
    const { shopName, product, style } = req.body;
    const prompt = `Write a catchy Instagram caption for a shop named ${shopName} promoting ${product} in a ${style} tone. Add emojis and 3 hashtags. Keep under 280 characters.`;
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini", // adjust to available model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 140
    });
    const caption = completion.data.choices[0].message.content.trim();
    res.json({ caption });
  } catch (err) {
    next(err);
  }
};

// POST /api/generate-image
exports.generateImage = async (req, res, next) => {
  try {
    const { product, style } = req.body;
    // DALL·E example: using images.generate (OpenAI sdk names may vary)
    const prompt = `Product photo: ${product}, style: ${style}, clean white background, studio lighting, highly detailed`;
    const result = await openai.createImage({
      prompt,
      size: "1024x1024",
      n: 1
    });
    // result.data.data[0].b64_json or url depending on SDK version
    const base64 = result.data.data[0].b64_json;
    const imageUrl = `data:image/png;base64,${base64}`;
    res.json({ imageUrl });
  } catch (err) {
    next(err);
  }
};

// GET /api/insights
exports.getInsights = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ userId });
    // Simple insight computations:
    const total = posts.length;
    const avgEngagement = total ? (posts.reduce((s,p)=>s+(p.engagement||0),0)/total).toFixed(2) : 0;
    // best time: naive calculation: find hour with highest average engagement
    const hourly = {};
    posts.forEach(p => {
      if (!p.scheduledAt) return;
      const h = new Date(p.scheduledAt).getHours();
      hourly[h] = hourly[h] || { sum:0, count:0 };
      hourly[h].sum += (p.engagement || 0);
      hourly[h].count++;
    });
    let bestHour = null;
    let bestAvg = -1;
    Object.entries(hourly).forEach(([h, obj]) => {
      const avg = obj.sum/obj.count;
      if (avg > bestAvg) { bestAvg = avg; bestHour = h; }
    });
    // Simple GPT insight prompt
    const prompt = `You are an assistant for a shop owner. They have ${total} posts and average engagement ${avgEngagement}. Suggest one short tip and one hashtag recommendation.`;
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 80
    });
    const aiTip = completion.data.choices[0].message.content.trim();

    res.json({
      totalPosts: total,
      avgEngagement,
      bestTime: bestHour !== null ? `${bestHour}:00` : null,
      aiTip
    });
  } catch (err) { next(err); }
};
