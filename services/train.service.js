import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { Train } from 'models';
import { logger } from '../config/logger';

export async function getTrainById(id, options = {}) {
  const train = await Train.findById(id, options.projection, options);
  return train;
}

export async function getOne(query, options = {}) {
  const train = await Train.findOne(query, options.projection, options);
  return train;
}

export async function getTrainList(filter, options = {}) {
  const train = await Train.find(filter, options.projection, options);
  return train;
}

export async function getTrainListWithPagination(filter, options = {}) {
  const train = await Train.paginate(filter, options);
  return train;
}

export async function createTrain(body) {
  try {
    const train = await Train.create(body);
    return train;
  } catch (error) {
    logger.error('error in creating Train:', error);
    if (error.name === 'MongoError' && error.code === 11000) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You are trying to create duplicate entry!');
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }
}

export async function updateTrain(filter, body, options = {}) {
  try {
    const train = await Train.findOneAndUpdate(filter, body, options);
    return train;
  } catch (error) {
    logger.error('error in creating Train:', error);
    if (error.name === 'MongoError' && error.code === 11000) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You are trying to create duplicate entry!');
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }
}

export async function updateManyTrain(filter, body, options = {}) {
  try {
    const train = await Train.updateMany(filter, body, options);
    return train;
  } catch (error) {
    logger.error('error in creating Train:', error);
    if (error.name === 'MongoError' && error.code === 11000) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You are trying to create duplicate entry!');
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }
}

export async function removeTrain(filter) {
  const train = await Train.findOneAndRemove(filter);
  return train;
}

export async function removeManyTrain(filter) {
  const train = await Train.deleteMany(filter);
  return train;
}

export async function aggregateTrain(query) {
  const train = await Train.aggregate(query);
  return train;
}

export async function aggregateTrainWithPagination(query, options = {}) {
  const aggregate = Train.aggregate();
  query.map((obj) => {
    aggregate._pipeline.push(obj);
  });
  const train = await Train.aggregatePaginate(aggregate, options);
  return train;
}
