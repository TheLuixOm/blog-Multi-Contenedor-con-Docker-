const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET /api/posts - Obtener todas las entradas
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/posts - Crear una nueva entrada
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
