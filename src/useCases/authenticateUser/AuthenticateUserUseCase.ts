import * as dotenv from 'dotenv'
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

import { client } from "../../prisma/client";
import { GenerateRefreshTokenProvider } from '../../provider/GenerateRefreshTokenProvider';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';

dotenv.config()

const refreshSecret = process.env.REFRESHTOKEN
const expireRefreshToken = '5m'

interface IRequest {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      }
    });

    if(!userAlreadyExists) {
      throw new Error ('User or password incorrect!');
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);
    if(!passwordMatch) {
      throw new Error ('User or password incorrect!');
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    })
    
    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshTokenProvider.execute(userAlreadyExists.id);

    return { token, refreshToken }
  }
}