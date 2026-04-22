import express from 'express';
import mongoose from 'mongoose';
import env from './env.json' with {type: 'json'};
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';


mongoose
  .connect(`mongodb+srv://${env.dbUser}:${env.dbPassword}@cluster0.zrma8dr.mongodb.net/${env.dbTable}?appName=Cluster0`)
  .then(() => console.log('DB CONNECT'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

// LOGIN
app.post('/auth/login/', UserController.login);

// REGISTER
app.post('/auth/register', registerValidation, UserController.register);

// USER
app.get('/auth/me', checkAuth, UserController.getMe);

// LISTEN
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('SERVER WORK');
});

// https://youtu.be/GQ_pTmcXNrQ?si=xJCkFmLh60yAVgQv&t=4801
