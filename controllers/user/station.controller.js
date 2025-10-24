import httpStatus from 'http-status';
import { stationService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';

const getStationFilterQuery = (query) => {
  const filter = pick(query, []);
  if (query.search) {
    filter.$or = [{ code: new RegExp(query.search, 'i') }, { name: new RegExp(query.search, 'i') }];
  }
  return filter;
};
export const getStation = catchAsync(async (req, res) => {
  const { stationId } = req.params;
  const filter = {
    _id: stationId,
  };
  const options = {};
  const station = await stationService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: station });
});

export const listStation = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getStationFilterQuery(query);
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
  const station = await stationService.getStationList(filter, options);
  return res.status(httpStatus.OK).send({ results: station });
});

export const paginateStation = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getStationFilterQuery(query);
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
  const station = await stationService.getStationListWithPagination(filter, options);
  station.results = station.results.map((stationObject) => ({
    createdAt: stationObject.createdAt,
    ...stationObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: station });
});

export const createStation = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const options = {};
  const station = await stationService.createStation(body, options);
  return res.status(httpStatus.CREATED).send({ results: station });
});

export const updateStation = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { stationId } = req.params;
  const filter = {
    _id: stationId,
  };
  const options = { new: true };
  const station = await stationService.updateStation(filter, body, options);
  return res.status(httpStatus.OK).send({ results: station });
});

export const removeStation = catchAsync(async (req, res) => {
  const { stationId } = req.params;
  const filter = {
    _id: stationId,
  };
  const station = await stationService.removeStation(filter);
  return res.status(httpStatus.OK).send({ results: station });
});
