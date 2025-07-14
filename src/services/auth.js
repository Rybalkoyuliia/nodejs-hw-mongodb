import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { UsersCollection } from '../db/models/user.js';
import { encryptPassword } from '../utils/hashPassword.js';
import { SessionCollection } from '../db/models/session.js';
import {
  getAccessTokenValidUntil,
  getRefreshTokenValidUntil,
} from '../constants/token.js';
import { DOMAIN, SECRET, SMTP } from '../constants/envkeys.js';
import { sendEmail } from '../utils/sendEmail.js';
import { TEMPLATES_DIR } from '../constants/index.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await encryptPassword(payload.password);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'User not found');

  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordCorrect) throw createHttpError(401, 'Unauthorized');

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: getAccessTokenValidUntil(),
    refreshTokenValidUntil: getRefreshTokenValidUntil(),
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: getAccessTokenValidUntil(),
    refreshTokenValidUntil: getRefreshTokenValidUntil(),
  };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionCollection.deleteOne({ _id: session._id, refreshToken });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const reqestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found!');

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    SECRET,
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${DOMAIN}/reset-password?token=${resetToken}`,
  });
  console.log(resetToken);

  try {
    await sendEmail({
      from: SMTP.FROM,
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    console.log(error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (payload) => {
  let entries;
  try {
    entries = jwt.verify(payload.token, SECRET);
  } catch (error) {
    if (error instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.');
    throw error;
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) throw createHttpError(404, 'User not found!');

  const hashedPassword = await encryptPassword(payload.password);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: hashedPassword },
  );
  await SessionCollection.deleteOne({ userId: user._id });
};
