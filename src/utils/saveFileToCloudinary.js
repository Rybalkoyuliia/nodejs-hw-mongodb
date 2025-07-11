import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { CLOUDINARY } from '../constants/envkeys.js';

cloudinary.config(CLOUDINARY);
export const saveFileToCloudinary = async (file) => {
  const { secure_url } = await cloudinary.uploader.upload(file.path, {
    folder: 'photo',
    use_filename: true,
  });
  await fs.unlink(file.path);
  return secure_url;
};
