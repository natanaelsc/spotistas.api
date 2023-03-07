import { randomBytes, scryptSync } from 'node:crypto';

export const generateRandomString = (length = 20, encode: BufferEncoding = 'base64'): string => {
  return randomBytes(length).toString(encode);
};

export const encrypt = (plainText: string, salt: string): string => {
  return scryptSync(plainText, salt, 64).toString('hex');
};

export const hash = (plainText: string): string => {
  const salt = generateRandomString(16, 'hex');
  return `${encrypt(plainText, salt)}:${salt}`;
};

export const compare = (plainText: string, hash: string): boolean => {
  const [encrypted, salt] = hash.split(':');
  return encrypted === encrypt(plainText, salt);
};
