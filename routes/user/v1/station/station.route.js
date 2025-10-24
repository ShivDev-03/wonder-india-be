import express from 'express';
import { stationController } from 'controllers/user';
import { stationValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createStation
   * */
  .post(auth('user'), validate(stationValidation.createStation), stationController.createStation)
  /**
   * getStation
   * */
  .get(auth('user'), validate(stationValidation.getStation), stationController.listStation);
router
  .route('/paginated')
  /**
   * getStationPaginated
   * */
  .get(auth('user'), validate(stationValidation.paginatedStation), stationController.paginateStation);
router
  .route('/:stationId')
  /**
   * getStationById
   * */
  .get(auth('user'), validate(stationValidation.getStationById), stationController.getStation)
  /**
   * updateStation
   * */
  .put(auth('user'), validate(stationValidation.updateStation), stationController.updateStation)
  /**
   * deleteStationById
   * */
  .delete(auth('user'), validate(stationValidation.deleteStationById), stationController.removeStation);
export default router;
