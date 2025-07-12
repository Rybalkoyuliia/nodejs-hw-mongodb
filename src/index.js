import { TEMP_DIR, UPLOADS_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExist } from './utils/createDirIfNotExist.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExist(TEMP_DIR);
  await createDirIfNotExist(UPLOADS_DIR);
  setupServer();
};

bootstrap();
