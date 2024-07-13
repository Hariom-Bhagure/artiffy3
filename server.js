const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/components/routes/auth');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const dbUser = encodeURIComponent('hariom_bhagure');
const dbPassword = encodeURIComponent('hariom9997');
const dbName = 'artiffy';

mongoose.connect('mongodb+srv://hariom_bhagure:hariom9997@cluster0.pqxnled.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', authRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
