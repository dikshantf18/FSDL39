// file: mongoApp.js

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected.');
}).catch(err => {
  console.log(err);
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// User Model
const User = mongoose.model('User', userSchema);

// POST /adduser route
app.post('/adduser', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Create a new user document
    const newUser = new User({ name, email });

    // Save the user to MongoDB
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User added successfully!' });
  } catch (err) {
    // Respond with error
    res.status(500).json({ error: 'Failed to add user', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
