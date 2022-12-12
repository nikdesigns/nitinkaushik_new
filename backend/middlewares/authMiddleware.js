import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin resource. Access denied' });
    }
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
