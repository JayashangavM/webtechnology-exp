const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/seedDB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('✅ Connected to MongoDB (seedDB)');
});

// Schema
const seedSchema = new mongoose.Schema({
    name: String,
    email: String,
    seedType: String,
    quantity: Number,
    feedback: String
});
const Seed = mongoose.model('Seed', seedSchema);

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'register.html')));
app.get('/seeds', async (req, res) => {
    const seeds = await Seed.find();
    res.json(seeds);
});

// Create
app.post('/seeds', async (req, res) => {
    const seed = new Seed(req.body);
    await seed.save();
    res.send(`<h2>✅ Seed Registered Successfully!</h2><a href="/">Back to Home</a>`);
});

// Update by name
app.post('/update', async (req, res) => {
    const result = await Seed.findOneAndUpdate(
        { name: req.body.name },
        { quantity: req.body.quantity }
    );
    if (result) {
        res.send(`<h2>🔄 Quantity updated for "${req.body.name}"!</h2><a href="/">Back to Home</a>`);
    } else {
        res.send(`<h2>❌ No seed found with name "${req.body.name}".</h2><a href="/">Back to Home</a>`);
    }
});

// Delete by name
app.post('/delete', async (req, res) => {
    const result = await Seed.findOneAndDelete({ name: req.body.name });
    if (result) {
        res.send(`<h2>🗑️ Seed with name "${req.body.name}" deleted!</h2><a href="/">Back to Home</a>`);
    } else {
        res.send(`<h2>❌ No seed found with name "${req.body.name}".</h2><a href="/">Back to Home</a>`);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
