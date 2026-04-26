import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

const productBody = {
  /**
   * Data URL, remote image URL, or existing Cloudinary URL. For multipart, use file field `image` instead.
   */
  image: Joi.string().allow(''),
  title: Joi.string().allow(''),
  description: Joi.string().allow(''),
  price: Joi.number().min(0),
  showInFrontend: Joi.boolean(),
};

export const createProduct = {
  body: Joi.object().keys({
    image: productBody.image.optional(),
    title: productBody.title,
    description: productBody.description,
    price: productBody.price,
    showInFrontend: productBody.showInFrontend,
  }),
};

export const updateProduct = {
  body: Joi.object().keys({
    image: Joi.string(),
    title: productBody.title,
    description: productBody.description,
    price: productBody.price,
    showInFrontend: productBody.showInFrontend,
  }),
  params: Joi.object().keys({
    productId: Joi.objectId().required(),
  }),
};

export const getProductById = {
  params: Joi.object().keys({
    productId: Joi.objectId().required(),
  }),
};

export const deleteProductById = {
  params: Joi.object().keys({
    productId: Joi.objectId().required(),
  }),
};

export const getProduct = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number(),
      limit: Joi.number(),
      sort: Joi.string().valid('title', 'price', 'createdAt'),
      order: Joi.string().valid('asc', 'desc').default('asc'),
      search: Joi.string(),
    })
    .unknown(true),
};

export const paginatedProduct = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
      sort: Joi.string().valid('title', 'price', 'createdAt'),
      order: Joi.string().valid('asc', 'desc').default('asc'),
    })
    .unknown(true),
};

export const getCatalog = {
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
      sort: Joi.string().valid('title', 'price', 'createdAt'),
      order: Joi.string().valid('asc', 'desc').default('asc'),
      search: Joi.string(),
    })
    .unknown(true),
};

export const getCatalogProductById = {
  params: Joi.object().keys({
    productId: Joi.objectId().required(),
  }),
};
