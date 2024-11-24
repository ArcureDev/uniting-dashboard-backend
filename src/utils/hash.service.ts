import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt } from "crypto";

const SALT_LENGTH_BYTES = 32;
const HASH_LENGTH_BYTES = 64;
const HASH_ITERATIONS = 1024;
const JOIN_CHARACTER = ".";

@Injectable()
export class HashService {

  async #hash(password: string, salt: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      scrypt(
        password,
        salt,
        HASH_LENGTH_BYTES,
        { N: HASH_ITERATIONS },
        (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        }
      );
    });
  }

  /**
   * @returns hashed password
   * @description hashes a password
   */
  async hash(password: string) {
    const salt = randomBytes(SALT_LENGTH_BYTES).toString("hex");
    const hash = await this.#hash(password, salt).then((x) => x.toString("hex"));
    return `${hash}${JOIN_CHARACTER}${salt}`;
  }
}
