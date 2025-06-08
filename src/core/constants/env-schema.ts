import * as Joi from 'joi';

const envSchema = {
  // ---------------BASIC CONFIG----------------
  PORT: Joi.number().required(),

  // ---------------DB CONFIG----------------
  'DB.PORT': Joi.number().required(),
  'DB.USER': Joi.string().required(),
  'DB.DIALECT': Joi.string().required(),
  'DB.PASS': Joi.string().required(),
  'DB.NAME': Joi.string().required(),
  'DB.HOST': Joi.string().required(),
};

export default envSchema;
