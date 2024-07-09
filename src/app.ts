import express, { json, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";

import contactRouter from "./routes/contacts-router";
import errorHandlerMiddleware from "./middlewares/error-middleware";
import httpStatus from "http-status";

dotenv.config();

const app = express();
app.get("/health", (req: Request, res: Response) => res.status(httpStatus.OK).send(`I'm okay!`));
app.use(json());
app.use(contactRouter);
app.use(errorHandlerMiddleware);

export default app;