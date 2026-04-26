import { Product } from 'models';

export async function getProductById(id, options = {}) {
  return Product.findById(id, options.projection, options);
}

export async function getOne(query, options = {}) {
  return Product.findOne(query, options.projection, options);
}

export async function getProductList(filter, options = {}) {
  return Product.find(filter, options.projection, options);
}

export async function getProductListWithPagination(filter, options = {}) {
  return Product.paginate(filter, options);
}

export async function createProduct(body) {
  return Product.create(body);
}

export async function updateProduct(filter, body, options = {}) {
  return Product.findOneAndUpdate(filter, body, { new: true, ...options });
}

export async function removeProduct(filter) {
  return Product.findOneAndRemove(filter);
}
