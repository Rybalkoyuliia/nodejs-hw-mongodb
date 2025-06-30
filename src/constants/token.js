export const getAccessTokenValidUntil = () =>
  new Date(Date.now() + 15 * 60 * 1000);

export const getRefreshTokenValidUntil = () =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
