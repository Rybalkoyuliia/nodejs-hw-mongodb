import path, { resolve } from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_DIR = resolve('temp');

export const UPLOADS_DIR = resolve('uploads');

export const SWAGGER_PATH = resolve('docs', 'swagger.json');
