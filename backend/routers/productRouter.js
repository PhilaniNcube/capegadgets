import express from 'express';
import expressAsycnHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsycnHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  }),
);

productRouter.get(
  '/seed',
  expressAsycnHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  }),
);

productRouter.get(
  '/:id',
  expressAsycnHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  }),
);

export default productRouter;
