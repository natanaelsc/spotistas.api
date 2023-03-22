import { randomBytes, scryptSync } from 'node:crypto';

export class Crypt {
  private static readonly _length = 20;
  private static readonly _encode: BufferEncoding = 'base64';

  static generate(length = this._length, encode = this._encode): string {
    return randomBytes(length).toString(encode);
  }

  static encrypt(plainText: string, salt: string): string {
    return scryptSync(plainText, salt, 64).toString('hex');
  }

  static hash(plainText: string): string {
    const salt = this.generate(16, 'hex');
    return `${this.encrypt(plainText, salt)}:${salt}`;
  }

  static compare(plainText: string, hash: string): boolean {
    const [encrypted, salt] = hash.split(':');
    return encrypted === this.encrypt(plainText, salt);
  }
}
