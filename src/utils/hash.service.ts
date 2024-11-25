import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt } from "crypto";
import * as phc from '@phc/format';

const SALT_LENGTH_BYTES = 32;
const HASH_LENGTH_BYTES = 64;
const HASH_ITERATIONS = 1024;

@Injectable()
export class HashService {

  async hash(password: string, salty?: string) {
    const {salt, hash} = await this.#generateHashAndSalt(password, salty);
    return this.#applyPHCFormat(salt, hash);
  }

  async compare(credentialsPassword: string, savedHash: string): Promise<boolean> {
    const { hash, salt } = phc.deserialize(savedHash);
    const newHash = (await this.#generateHashAndSalt(credentialsPassword, salt?.toString('base64'))).hash;
    return hash?.toString('base64') === newHash;
  }

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

  async #generateHashAndSalt(password: string, salt?: string): Promise<{salt: string, hash: string}> {
    const salty = salt ?? randomBytes(SALT_LENGTH_BYTES).toString("hex");
    const hash = await this.#hash(password, salty).then((x) => x.toString("hex"));
    return {salt: salty, hash};
  }

  #applyPHCFormat(salt: string, hash: string): string {
    const phcobj = {
      id: 'scrypt',
      params: {
        n: 16384, // cost
        r: 8, // blocksize
        p: 1 // parallelization
      },
      salt: Buffer.from(salt, 'base64'),
      hash: Buffer.from(hash, 'base64'),
    };
    return phc.serialize(phcobj);
  }

}
