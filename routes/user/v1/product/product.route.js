import express from 'express';
import { productController } from 'controllers/user';
import { productValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();

/**
 * Public storefront: products marked showInFrontend (no auth)
 */
router.get('/catalog', validate(productValidation.getCatalog), productController.listCatalog);
router.get('/catalog/:productId', validate(productValidation.getCatalogProductById), productController.getCatalogProduct);

router
  .route('/')
  .post(auth('user'), validate(productValidation.createProduct), productController.createProduct)
  .get(auth('user'), validate(productValidation.getProduct), productController.listProduct);
router.route('/paginated').get(validate(productValidation.paginatedProduct), productController.paginateProduct);
router
  .route('/:productId')
  .get(auth('user'), validate(productValidation.getProductById), productController.getProduct)
  .put(auth('user'), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth('user'), validate(productValidation.deleteProductById), productController.removeProduct);
export default router;
