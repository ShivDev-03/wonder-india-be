import httpStatus from 'http-status';
import { trainService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';

const getTrainFilterQuery = (query) => {
  const filter = pick(query, ['sourceCode', 'destinationCode']);
  if (query.search) {
    filter.$or = [];
  }
  return filter;
};
export const getTrain = catchAsync(async (req, res) => {
  const { trainId } = req.params;
  const filter = {
    _id: trainId,
  };
  const options = {};
  const train = await trainService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: train });
});

export const listTrain = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getTrainFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {
    ...queryParams,
  };
  const options = {
    limit: query.limit,
    skip: (query.page - 1) * query.limit,
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const train = await trainService.getTrainList(filter, options);
  return res.status(httpStatus.OK).send({ results: train });
});

export const paginateTrain = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getTrainFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {
    ...queryParams,
  };
  const options = {
    ...pick(query, ['limit', 'page']),
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const train = await trainService.getTrainListWithPagination(filter, options);
  train.results = train.results.map((trainObject) => ({
    createdAt: trainObject.createdAt,
    ...trainObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: train });
});

export const createTrain = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const options = {};
  const train = await trainService.createTrain(body, options);
  return res.status(httpStatus.CREATED).send({ results: train });
});

export const updateTrain = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { trainId } = req.params;
  const filter = {
    _id: trainId,
  };
  const options = { new: true };
  const train = await trainService.updateTrain(filter, body, options);
  return res.status(httpStatus.OK).send({ results: train });
});

export const removeTrain = catchAsync(async (req, res) => {
  const { trainId } = req.params;
  const filter = {
    _id: trainId,
  };
  const train = await trainService.removeTrain(filter);
  return res.status(httpStatus.OK).send({ results: train });
});
