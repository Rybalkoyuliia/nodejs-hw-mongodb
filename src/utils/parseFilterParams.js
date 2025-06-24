import { contactTypes } from '../constants/validationConstants.js';

const parseContactType = (type) => {
  if (typeof type !== 'string') return;
  if (contactTypes.includes(type)) return type;
};

const parseFavourites = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;

  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;

  return;
};

export const parseFilterParams = ({ type, isFavourite }) => {
  const parsedContactType = parseContactType(type);
  const parsedFavourites = parseFavourites(isFavourite);
  return {
    contactType: parsedContactType,
    isFavourite: parsedFavourites,
  };
};
