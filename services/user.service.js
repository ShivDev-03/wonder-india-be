import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { User } from 'models';

export async function getUserById(id, options = {}) {
  const user = await User.findById(id, options.projection, options);
  return user;
}

export async function getOne(query, options = {}) {
  const user = await User.findOne(query, options.projection, options);
  return user;
}

export async function getUserList(filter, options = {}) {
  const user = await User.find(filter, options.projection, options);
  return user;
}

export async function getUserListWithPagination(filter, options = {}) {
  const user = await User.paginate(filter, options);
  return user;
}

export async function createUser(body) {
  if (await User.isEmailTaken(body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(body);
  return user;
}

export async function updateUser(filter, body, options = {}) {
  const userData = await getOne(filter, {});
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  if (body.email && (await User.isEmailTaken(body.email, userData.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.findOneAndUpdate(filter, body, options);
  return user;
}

export async function updateManyUser(filter, body, options = {}) {
  const user = await User.updateMany(filter, body, options);
  return user;
}

export async function removeUser(filter) {
  const user = await User.findOneAndRemove(filter);
  return user;
}

export async function removeManyUser(filter) {
  const user = await User.deleteMany(filter);
  return user;
}

export async function aggregateUser(query) {
  const user = await User.aggregate(query);
  return user;
}

export async function aggregateUserWithPagination(query, options = {}) {
  const aggregate = User.aggregate();
  query.map((obj) => {
    aggregate._pipeline.push(obj);
  });
  const user = await User.aggregatePaginate(aggregate, options);
  return user;
}
