import { Router } from "express";

import { routerUser } from "./user.router";

export const router = Router();

router.use('/users', routerUser);



