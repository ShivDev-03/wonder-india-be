import httpStatus from 'http-status';
import { userService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';

export const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const filter = {
    _id: userId,
  };
  const options = {};
  const user = await userService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: user });
});

export const listUser = catchAsync(async (req, res) => {
  const { query } = req;
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {};
  const options = {
    limit: query.limit,
    skip: (query.page - 1) * query.limit,
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const user = await userService.getUserList(filter, options);
  return res.status(httpStatus.OK).send({ results: user });
});

export const paginateUser = catchAsync(async (req, res) => {
  const { query } = req;
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {};
  const options = {
    ...pick(query, ['limit', 'page']),
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const user = await userService.getUserListWithPagination(filter, options);
  user.results = user.results.map((userObject) => ({
    createdAt: userObject.createdAt,
    ...userObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: user });
});

export const createUser = catchAsync(async (req, res) => {
  const { body } = req;
  const options = {};
  const user = await userService.createUser(body, options);
  return res.status(httpStatus.CREATED).send({ results: user });
});

export const updateUser = catchAsync(async (req, res) => {
  const { body } = req;
  const { userId } = req.params;
  const filter = {
    _id: userId,
  };
  const options = { new: true };
  const user = await userService.updateUser(filter, body, options);
  return res.status(httpStatus.OK).send({ results: user });
});

export const removeUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const filter = {
    _id: userId,
  };
  const user = await userService.removeUser(filter);
  return res.status(httpStatus.OK).send({ results: user });
});
