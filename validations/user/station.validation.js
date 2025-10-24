import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

export const createStation = {
  body: Joi.object().keys({
    code: Joi.string().required(),
    name: Joi.string().required(),
    district: Joi.string(),
    trainPassingThrough: Joi.string(),
  }),
};

export const updateStation = {
  body: Joi.object().keys({
    code: Joi.string(),
    name: Joi.string(),
    district: Joi.string(),
    trainPassingThrough: Joi.string(),
  }),
  params: Joi.object().keys({
    stationId: Joi.objectId().required(),
  }),
};

export const getStationById = {
  params: Joi.object().keys({
    stationId: Joi.objectId().required(),
  }),
};

export const deleteStationById = {
  params: Joi.object().keys({
    stationId: Joi.objectId().required(),
  }),
};

export const getStation = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number(),
      limit: Joi.number(),
      sort: Joi.string().valid('code', 'name'),
      order: Joi.string().valid('asc', 'desc').default('asc'),
      search: Joi.string(),
    })
    .unknown(true),
};

export const paginatedStation = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
      sort: Joi.string().valid('code', 'name'),
      order: Joi.string().valid('asc', 'desc').default('asc'),
    })
    .unknown(true),
};
