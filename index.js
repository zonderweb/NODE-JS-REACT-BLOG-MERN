import express from 'express';
import mongoose from 'mongoose';
import env from './env.json' with {type: 'json'};
import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostControllers.js';


mongoose
  .connect(`mongodb+srv://${env.dbUser}:${env.dbPassword}@cluster0.zrma8dr.mongodb.net/${env.dbTable}?appName=Cluster0`)
  .then(() => console.log('DB CONNECT'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

// LOGIN
app.post('/auth/login/', loginValidation, UserController.login);

// REGISTER
app.post('/auth/register', registerValidation, UserController.register);

// USER
app.get('/auth/me', checkAuth, UserController.getMe);

// POSTS
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
// app.patch('/posts', PostController.update);

// LISTEN
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('SERVER WORK');
});

// https://youtu.be/GQ_pTmcXNrQ?si=vqdTQg_irj_yE9AE&t=6383
