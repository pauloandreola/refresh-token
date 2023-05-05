import dayjs from "dayjs";
import { client } from "../prisma/client";

export class GenerateRefreshTokenProvider {
  async execute(userId: string) {
    const expiresIn = dayjs().add(2, "minutes").unix();
    const generateRefreshTokenProvider = await client.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    });

    return generateRefreshTokenProvider;
  }
}