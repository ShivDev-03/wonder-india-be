import path from 'path';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Resolve from this file so it works from both repo root and `build/` (cwd-independent)
const specPath = path.join(__dirname, '../../../docs/opencollection.yml');
const swaggerDocument = YAML.load(specPath);
const router = express.Router();
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = router;
