import { client } from "../../prisma/client";

export class ListAllUsersUseCase {
  async execute() {
    const users = await client.user.findMany();

    return users;
  }
}