// ✅ 1. Load env FIRST and only ONCE
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

// ✅ 2. Log for verification
console.log("🔍 EMAIL_USER:", process.env.EMAIL_USER);
console.log("🔍 EMAIL_PASS present:", !!process.env.EMAIL_PASS);

// ✅ 3. Import everything else AFTER env is ready
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contact');
//const productRoutes = require('./routes/product');
const popupcontactRoutes = require('./routes/popupcontact');
const subscribeRoutes = require('./routes/subscribe');

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ 4. Middleware
app.use(cors());
app.use(express.json());

// ✅ 5. API Routes
app.use('/api/contact', contactRoutes);
//app.use('/api/products', productRoutes);
app.use('/api/popupcontact', popupcontactRoutes);
app.use('/api/subscribe', subscribeRoutes);
//app.use('/api/search', require('./routes/search'));
 




// ✅ 6. Connect to MongoDB
//mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 App running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
