import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import env from './env.json' with {type: 'json'};
import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js';
import { UserController, PostController } from './controllers/index.js';
import { handleValidationsErrors, checkAuth } from './utils/index.js';


mongoose
  .connect(`mongodb+srv://${env.dbUser}:${env.dbPassword}@cluster0.zrma8dr.mongodb.net/${env.dbTable}?appName=Cluster0`)
  .then(() => console.log('DB CONNECT'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// LOGIN
app.post('/auth/login/', loginValidation, handleValidationsErrors, UserController.login);

// REGISTER
app.post('/auth/register', registerValidation, handleValidationsErrors, UserController.register);

// USER
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// POSTS
app.get('/posts', PostController.getAll);
app.post('/posts', checkAuth, postCreateValidation, handleValidationsErrors, PostController.create);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationsErrors, PostController.update);

// LISTEN
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('SERVER WORK');
});

// https://youtu.be/GQ_pTmcXNrQ?si=94Yo3igzth9YvEnX&t=7505
