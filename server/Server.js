const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User1');





const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://hariom_bhagure:hariom9997@cluster0.pqxnled.mongodb.net/artiffy", { useNewUrlParser: true, useUnifiedTopology: true });

// Event listeners for Mongoose connection
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

app.post("/login" ,(req,res) => {
  const {email,password} = req.body;
  UserModel.findOne({email:email})
  .then(user =>{
    if(user){
      if(user.password === password){
        res.json("success")

      }else{
        res.json("the password is incorrect");
        
      }
    }else{
      res.json("no record existed")
     

    }
  })

})

app.post('/signup', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.listen(4000, () => {
  console.log("Server is running successfully on port 4000");
});
