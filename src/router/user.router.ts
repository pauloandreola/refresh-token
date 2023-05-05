import { Router } from "express";

import { AuthenticateUserController } from "../useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { ListAllUsersController } from "../useCases/listAllUsers/ListAllUsersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { RefreshTokenUserController } from "../useCases/refreshTokenUser/RefreshTokenUserController";


export const routerUser = Router();

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();
const refreshTokenUserController = new RefreshTokenUserController();

routerUser.post('/login', authenticateUserController.handle);
routerUser.post('/', createUserController.handle);
routerUser.get('/', ensureAuthenticated, listAllUsersController.handle);
routerUser.post('/refreshtoken', refreshTokenUserController.handle);
