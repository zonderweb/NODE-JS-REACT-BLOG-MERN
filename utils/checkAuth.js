import jwt from 'jsonwebtoken';
import env from '../env.json' with {type: 'json'};

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, env.secret);

      req.userId = decoded._id;
      return next();
    } catch (err) {
      console.log(err);

      return res.status(403).json({
        message: 'Немає доступу',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Немає доступу',
    });
  }
};
