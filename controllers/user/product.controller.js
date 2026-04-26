import httpStatus from 'http-status';
import { productService, cloudinaryService } from 'services';
import ApiError from 'utils/ApiError';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';

const escapeForRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getProductFilterQuery = (query) => {
  const filter = {};
  if (query.showInFrontend === 'true' || query.showInFrontend === true) {
    filter.showInFrontend = true;
  } else if (query.showInFrontend === 'false' || query.showInFrontend === false) {
    filter.showInFrontend = false;
  }
  if (query.search) {
    const safe = escapeForRegex(String(query.search));
    filter.$or = [{ title: { $regex: safe, $options: 'i' } }, { description: { $regex: safe, $options: 'i' } }];
  }
  return filter;
};

export const getProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const filter = { _id: productId };
  const options = {};
  const product = await productService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: product });
});

export const listProduct = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getProductFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = { [sortingObj.sort]: sortingObj.order };
  const filter = queryParams;
  const options = {
    limit: query.limit,
    skip: (query.page - 1) * query.limit,
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const product = await productService.getProductList(filter, options);
  return res.status(httpStatus.OK).send({ results: product });
});

export const paginateProduct = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getProductFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = { [sortingObj.sort]: sortingObj.order };
  const filter = queryParams;
  const options = {
    ...pick(query, ['limit', 'page']),
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const result = await productService.getProductListWithPagination(filter, options);
  result.results = result.results.map((row) => ({
    createdAt: row.createdAt,
    ...row.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: result });
});

export const createProduct = catchAsync(async (req, res) => {
  console.log(`====> (req) <=====`, req);
  const secureUrl = await cloudinaryService.uploadProductImageFromRequest(req);
  console.log(`====> (secureUrl) <=====`, secureUrl);
  if (!secureUrl) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Image is required: send `image` in JSON (data URL or URL) or a multipart file field named `image`'
    );
  }
  const fields = pick(req.body, ['title', 'description', 'price', 'showInFrontend']);
  if (req.body.showInFrontend === 'true' || req.body.showInFrontend === 'false') {
    fields.showInFrontend = req.body.showInFrontend === 'true';
  }
  const product = await productService.createProduct({
    ...fields,
    url: secureUrl,
    image: secureUrl,
  });
  return res.status(httpStatus.CREATED).send({ results: product });
});

export const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const secureUrl = await cloudinaryService.uploadProductImageFromRequest(req);
  const fields = pick(req.body, ['title', 'description', 'price', 'showInFrontend']);
  if (req.body.showInFrontend === 'true' || req.body.showInFrontend === 'false') {
    fields.showInFrontend = req.body.showInFrontend === 'true';
  }
  if (secureUrl) {
    fields.url = secureUrl;
    fields.image = secureUrl;
  }
  const filter = { _id: productId };
  const options = { new: true };
  const product = await productService.updateProduct(filter, fields, options);
  return res.status(httpStatus.OK).send({ results: product });
});

export const removeProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const filter = { _id: productId };
  const product = await productService.removeProduct(filter);
  return res.status(httpStatus.OK).send({ results: product });
});

/**
 * Public catalog: only products that should appear on the frontend
 */
export const listCatalog = catchAsync(async (req, res) => {
  const { query } = req;
  const filter = { showInFrontend: true };
  if (query.search) {
    const safe = escapeForRegex(String(query.search));
    filter.$or = [{ title: { $regex: safe, $options: 'i' } }, { description: { $regex: safe, $options: 'i' } }];
  }
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = { [sortingObj.sort]: sortingObj.order };
  const options = {
    ...pick(query, ['limit', 'page']),
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const result = await productService.getProductListWithPagination(filter, options);
  result.results = result.results.map((row) => ({
    createdAt: row.createdAt,
    ...row.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: result });
});

export const getCatalogProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await productService.getOne({ _id: productId, showInFrontend: true }, {});
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return res.status(httpStatus.OK).send({ results: product });
});
