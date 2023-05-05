import dayjs from "dayjs";

import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshTokenProvider";


export class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    });
    if(!refreshToken) {
      throw new Error ('Invalid refresh token!');
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    if(refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      });

      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
      const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId);

      return { token, newRefreshToken }
    }

    return { token };
  }
}