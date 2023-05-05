import { compare } from "bcryptjs";

import { client } from "../../prisma/client";


export class LoginUserUseCase {
  async execute({ username, password }) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    });

    if (userAlreadyExists) {
      throw new Error ('User already Exists!'); 
    }

    const password = await compare(password, )
  }
}