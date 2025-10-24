import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

export const createTrain = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    trainNo: Joi.number().integer().required(),
    sourceCode: Joi.objectId().required(),
    destinationCode: Joi.objectId().required(),
  }),
};

export const updateTrain = {
  body: Joi.object().keys({
    name: Joi.string(),
    trainNo: Joi.number().integer(),
    sourceCode: Joi.objectId(),
    destinationCode: Joi.objectId(),
  }),
  params: Joi.object().keys({
    trainId: Joi.objectId().required(),
  }),
};

export const getTrainById = {
  params: Joi.object().keys({
    trainId: Joi.objectId().required(),
  }),
};

export const deleteTrainById = {
  params: Joi.object().keys({
    trainId: Joi.objectId().required(),
  }),
};

export const getTrain = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number(),
      limit: Joi.number(),
      sort: Joi.string().valid('trainNo'),
      order: Joi.string().valid('asc', 'desc').default('asc'),
    })
    .unknown(true),
};

export const paginatedTrain = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
      sort: Joi.string().valid('trainNo'),
      order: Joi.string().valid('asc', 'desc').default('asc'),
    })
    .unknown(true),
};
