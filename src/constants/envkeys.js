import dotenv from 'dotenv';
import { getEnvVar } from '../utils/getEnvVar.js';

dotenv.config();

export const PORT = Number(getEnvVar('PORT', '3000'));
export const user = getEnvVar('MONGODB_USER');
export const password = getEnvVar('MONGODB_PASSWORD');
export const url = getEnvVar('MONGODB_URL');
export const db = getEnvVar('MONGODB_DB');
