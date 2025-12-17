const express = require('express');
const initiativesRoutes = require('./routes/initiatives');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Sustainability API',
    endpoints: {
      initiatives: '/api/initiatives'
    }
  });
});

app.use('/api/initiatives', initiativesRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
