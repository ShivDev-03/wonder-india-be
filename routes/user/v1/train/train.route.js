import express from 'express';
import { trainController } from 'controllers/user';
import { trainValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createTrain
   * */
  .post(auth('user'), validate(trainValidation.createTrain), trainController.createTrain)
  /**
   * getTrain
   * */
  .get(auth('user'), validate(trainValidation.getTrain), trainController.listTrain);
router
  .route('/paginated')
  /**
   * getTrainPaginated
   * */
  .get(auth('user'), validate(trainValidation.paginatedTrain), trainController.paginateTrain);
router
  .route('/:trainId')
  /**
   * getTrainById
   * */
  .get(auth('user'), validate(trainValidation.getTrainById), trainController.getTrain)
  /**
   * updateTrain
   * */
  .put(auth('user'), validate(trainValidation.updateTrain), trainController.updateTrain)
  /**
   * deleteTrainById
   * */
  .delete(auth('user'), validate(trainValidation.deleteTrainById), trainController.removeTrain);
export default router;
