const express = require('express');
const Application = require('../models/Application');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const app = new Application(req.body);
    await app.save();
    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/applicant/:id', async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.params.id }).populate('job');
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/job/:id', async (req, res) => {
  try {
    const apps = await Application.find({ job: req.params.id }).populate('applicant');
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
