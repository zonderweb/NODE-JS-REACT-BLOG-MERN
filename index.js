import express from 'express';
import env from './env.json' with {type: 'json'};
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';
import userModel from './models/User.js';


mongoose
  .connect(`mongodb+srv://${env.dbUser}:${env.dbPassword}@cluster0.zrma8dr.mongodb.net/${env.dbTable}?appName=Cluster0`)
  .then(() => console.log('DB CONNECT'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

// LOGIN
app.post('/auth/login/', async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: 'Користувача не знайдено', // Не вірний логін або пароль
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({
        message: 'Не вірний пароль', // Не вірний логін або пароль
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      env.secret,
      {
        expiresIn: '30d',
      },
    );
    // eslint-disable-next-line
    const { passwordHash, ...userData } = user._doc;

    return res.json({
      ...userData,
      token,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не вдалось авторизуватись',
    });
  }
});

// REGISTER
app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new userModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      env.secret,
      {
        expiresIn: '30d',
      },
    );
    // eslint-disable-next-line
    const { passwordHash, ...userData } = user._doc;

    return res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не вдалось зарееструвати',
    });
  }
});




app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('SERVER WORK');
});

// https://youtu.be/GQ_pTmcXNrQ?si=qCsdVL7bddyVYOdY&t=3891
