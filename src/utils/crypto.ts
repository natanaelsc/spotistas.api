import { randomBytes } from 'node:crypto';

export const generateRandomString = (length = 20, encode: BufferEncoding = 'base64'): string => {
  return randomBytes(length).toString(encode);
};
