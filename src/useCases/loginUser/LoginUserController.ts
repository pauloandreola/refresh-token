import { Request, Response } from "express";

export class LoginUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

  }
}