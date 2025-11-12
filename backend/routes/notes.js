const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');
const { noteValidator } = require('../utils/validators');
const { validationResult } = require('express-validator');

// Create note
router.post('/', auth, noteValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, content, tags } = req.body;
    const note = new Note({ user: req.user.id, title, content, tags });
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Read all notes (with search/filter via query)
router.get('/', auth, async (req, res) => {
  try {
    const { q, tag } = req.query;
    const query = { user: req.user.id };
    if (q) query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } }
    ];
    if (tag) query.tags = tag;
    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get single note
router.get('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update
router.put('/:id', auth, noteValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) return res.status(404).json({ message: 'Note not found' });

    const { title, content, tags } = req.body;
    note.title = title;
    note.content = content;
    note.tags = tags || [];
    note.updatedAt = Date.now();
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) return res.status(404).json({ message: 'Note not found' });

    await note.remove();
    res.json({ message: 'Note removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
