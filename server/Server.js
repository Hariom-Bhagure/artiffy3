const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('./models/User1');
const ARmodal = require('./models/ARmodal');
const contactModel = require('./models/contactModel');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://hariom_bhagure:hariom9997@cluster0.pqxnled.mongodb.net/artiffy", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

const JWT_SECRET = "Hariom_Bhagure"; // Replace with a secure key

// User login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
          } else {
            res.status(401).json("The password is incorrect");
          }
        });
      } else {
        res.status(404).json("No record existed");
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// User signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  UserModel.create({ email, password })
    .then(user => {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    })
    console.log("kay kanala bhho ith paryant tr tu ala")
    .catch(err => res.status(500).json({ error: err.message }));
});

// ARmodal
app.post('/armodal', (req, res) => {  
  const { title, description, file } = req.body;
  ARmodal.create({ title, description, file })
    .then(armodal => res.json(armodal))
    .catch(err => {
      console.error('Error creating ARmodal:', err);
      res.status(500).json({ error: err.message });
    });
});
  
app.post('/contactus', (req, res) => {
  console.log('Received request at /contactus');
  const { name, email, phone } = req.body;
  contactModel.create({ name, email, phone })
    .then(contacts => res.json(contacts))
    .catch(err => res.status(500).json({ error: err.message }));
});

// token validation after refresh

app.get('/validate-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, 'Hariom_Bhagure', (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    res.status(200).send('Token is valid');
  });
});


app.listen(4000, () => {
  console.log("Server is running successfully on port 4000");
});
