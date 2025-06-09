import dotenv from 'dotenv';
import { getEnvVar } from '../utils/getEnvVar.js';

dotenv.config();

export const PORT = Number(getEnvVar('PORT', '3000'));
