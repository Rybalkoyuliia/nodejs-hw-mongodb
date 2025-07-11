import dotenv from 'dotenv';
import { getEnvVar } from '../utils/getEnvVar.js';

dotenv.config();

export const PORT = Number(getEnvVar('PORT', '3000'));
export const user = getEnvVar('MONGODB_USER');
export const password = getEnvVar('MONGODB_PASSWORD');
export const url = getEnvVar('MONGODB_URL');
export const db = getEnvVar('MONGODB_DB');

export const SMTP = {
  HOST: getEnvVar('SMTP_HOST'),
  PORT: Number(getEnvVar('SMTP_PORT')),
  USER: getEnvVar('SMTP_USER'),
  PASSWORD: getEnvVar('SMTP_PASSWORD'),
  FROM: getEnvVar('SMTP_FROM'),
};

export const SECRET = getEnvVar('JWT_SECRET');
export const DOMAIN = getEnvVar('APP_DOMAIN');

export const CLOUDINARY = {
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDINARY_API_KEY'),
  api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
};

export const enableCloudinary = getEnvVar('ENABLE_CLOUDINARY');
