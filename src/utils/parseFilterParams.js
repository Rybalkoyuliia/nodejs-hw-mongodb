import { contactTypes } from '../constants/validationConstants.js';

const parseContactType = (type) => {
  if (typeof type !== 'string') return;
  if (contactTypes.includes(type)) return type;
};

const parseFavorites = (isFavorite) => {
  if (typeof isFavorite !== 'string') return;

  if (isFavorite === 'true') return true;
  if (isFavorite === 'false') return false;

  return;
};

export const parseFilterParams = ({ type, isFavorite }) => {
  const parsedContactType = parseContactType(type);
  const parsedFavorites = parseFavorites(isFavorite);
  return {
    contactType: parsedContactType,
    isFavorite: parsedFavorites,
  };
};
