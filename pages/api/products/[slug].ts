import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';

type Data = { message: string } | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);
    case 'DELETE':
      return deleteProduct(req, res);
    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  const { slug } = req.query;
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(404).json({
      message: 'Producto no encontrado',
    });
  }

  product.images = product.images.map((image) => {
    return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`;
  });

  return res.json(product);
}

async function deleteProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!req.query.slug || typeof req.query.slug !== 'string') {
    return res.status(400).json({
      message: 'Slug parameter is missing or invalid',
    });
  }

  await db.connect();
  const { slug } = req.query;
  const product = await Product.findOne({ slug });

  if (!product) {
    await db.disconnect();
    return res.status(404).json({
      message: 'Producto no encontrado',
    });
  }

  await product.remove();
  await db.disconnect();

  return res.json({
    message: 'Producto eliminado exitosamente',
  });
}