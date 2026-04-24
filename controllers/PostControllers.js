import mongoose from 'mongoose';
import PostModel from '../models/Post.js';

// GET ALL ARTICLE
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не вдалось отримати статті'
    });
  }
};

// GET ONE ARTICLE
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: 'Некоректний id статті'
      });
    }

    const doc = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    ).populate('user'); // all user info

    if (!doc) {
      return res.status(404).json({
        message: 'Матеріал не знайдено'
      });
    }
    return res.json(doc);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не вдалось отримати статтю'
    });
  }
};

// CREATE ARTICLE
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    return res.json(post);

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не вдалось створити пост'
    });
  }
};

// DELETE ARTICLE
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndDelete({
      _id: postId,
    });

    if (!doc) {
      return res.status(404).json({
        message: 'Матеріал не знайдено'
      });
    }
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не вдалось знайти статтю для видалення'
    });
  }
};
