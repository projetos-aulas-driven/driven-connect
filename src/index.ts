import express, { json, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";

import contactRouter from "./routes/contacts-router";
import errorHandlerMiddleware from "./middlewares/error-middleware";
import httpStatus from "http-status";

dotenv.config();

const app = express();
app.get("/health", (req: Request, res: Response) => res.sendStatus(httpStatus.OK));
app.use(json());
app.use(contactRouter);
app.use(errorHandlerMiddleware);

const port = +process.env.PORT || 5000;
app.listen(port, () => console.log("Server is up and running on port " + port));