import swaggerUI from 'swagger-ui-express';
import { readFileSync } from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';
import createHttpError from 'http-errors';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(readFileSync(SWAGGER_PATH, 'utf-8'));
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (error) {
    return (req, res, next) => {
      next(createHttpError(500, error.message));
    };
  }
};
