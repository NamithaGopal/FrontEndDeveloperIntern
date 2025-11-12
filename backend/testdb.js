require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ OK connected to MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ ERR:', err.message);
    process.exit(1);
  });
