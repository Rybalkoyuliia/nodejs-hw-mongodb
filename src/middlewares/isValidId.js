import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!isValidObjectId(id)) {
    throw createHttpError(400, `Id: "${id}" is not valid`);
  }
  next();
};
