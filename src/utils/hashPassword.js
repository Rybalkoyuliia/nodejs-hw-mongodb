import bcrypt from 'bcrypt';

export const encryptPassword = async (password) =>
  await bcrypt.hash(password, 10);
