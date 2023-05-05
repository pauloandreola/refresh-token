import * as dotenv from 'dotenv'
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from './router';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.json({ status: 'Error', message: error.message });
});

app.listen(port, ()=> console.log('Server is running at port -> ', port));