import userModel from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/authHelper.js';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ ok: true, users });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name.trim())
      return res.status(400).json({ error: 'Name is required' });
    if (!email.trim())
      return res.status(400).json({ error: 'Email is required' });
    if (!password.trim() || password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password is required and should be min 6 characters' });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is taken' });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.json({ ok: true, user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.trim())
      return res.status(400).json({ error: 'Email is required' });
    if (!password.trim() || password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password is required and should be min 6 characters' });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.json({ ok: true, user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const secret = (req, res) => {
  res.json({ currentUser: req.user });
};
