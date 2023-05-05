import * as dotenv from 'dotenv'
import { sign } from "jsonwebtoken";

dotenv.config();

const secret = process.env.TOKEN
const expireToken = '2m'

export class GenerateTokenProvider {
    async execute(userId: string) {
      const token = sign({}, secret, { subject: userId, expiresIn: expireToken});

      return token;
    }
}