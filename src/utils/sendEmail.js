import nodemailer from 'nodemailer';
import { SMTP } from '../constants/envkeys.js';

const transporter = nodemailer.createTransport({
  host: SMTP.HOST,
  port: SMTP.PORT,
  auth: {
    user: SMTP.USER,
    pass: SMTP.PASSWORD,
  },
});

// export const sendEmail = async (options) => {
//   return await transporter.sendMail(options);
// };

export const sendEmail = async (options) => {
  console.log('Email sending is skipped during dev');
  return true;
};
