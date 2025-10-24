import { Station } from 'models';

export async function getStationById(id, options = {}) {
  const station = await Station.findById(id, options.projection, options);
  return station;
}

export async function getOne(query, options = {}) {
  const station = await Station.findOne(query, options.projection, options);
  return station;
}

export async function getStationList(filter, options = {}) {
  const station = await Station.find(filter, options.projection, options);
  return station;
}

export async function getStationListWithPagination(filter, options = {}) {
  const station = await Station.paginate(filter, options);
  return station;
}

export async function createStation(body) {
  const station = await Station.create(body);
  return station;
}

export async function updateStation(filter, body, options = {}) {
  const station = await Station.findOneAndUpdate(filter, body, options);
  return station;
}

export async function updateManyStation(filter, body, options = {}) {
  const station = await Station.updateMany(filter, body, options);
  return station;
}

export async function removeStation(filter) {
  const station = await Station.findOneAndRemove(filter);
  return station;
}

export async function removeManyStation(filter) {
  const station = await Station.deleteMany(filter);
  return station;
}

export async function aggregateStation(query) {
  const station = await Station.aggregate(query);
  return station;
}

export async function aggregateStationWithPagination(query, options = {}) {
  const aggregate = Station.aggregate();
  query.map((obj) => {
    aggregate._pipeline.push(obj);
  });
  const station = await Station.aggregatePaginate(aggregate, options);
  return station;
}
