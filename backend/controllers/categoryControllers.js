import Category from '../models/categoryModel.js';
import slugify from 'slugify';

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }
    const slug = slugify(name).toLowerCase();
    const category = await new Category({ name, slug }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name).toLowerCase() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const list = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
