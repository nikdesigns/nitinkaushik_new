import Product from '../models/productModel.js';
import slugify from 'slugify';
import fs from 'fs';

export const create = async (req, res) => {
  try {
    const { name, price, description, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name.trim():
        return res.status(400).json({ err: 'Name is required' });
      case !price.trim():
        return res.status(400).json({ err: 'Price is required' });
      case !description.trim():
        return res.status(400).json({ err: 'Description is required' });
      case !category.trim():
        return res.status(400).json({ err: 'Category is required' });
      case !quantity.trim():
        return res.status(400).json({ err: 'Quantity is required' });
      case !shipping.trim():
        return res.status(400).json({ err: 'Shipping is required' });
    }
    if (photo && photo.size > 1000000) {
      return res.status(400).json({ err: 'Image should be less than 1mb' });
    }

    //create product
    const product = new Product({
      ...req.fields,
      slug: slugify(name),
      photo: {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      },
    });

    //save product
    await product.save();
    res.status(201).json({ product });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .select('-photo')
      .limit(10)
      .sort({ createdAt: -1 })
      .populate('category')
      .exec();
    res.status(200).json({ products });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category')
      .select('-photo');
    res.status(200).json({ product });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
