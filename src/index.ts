import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";

import contactRouter from "./routes/contacts-router";
import errorHandlerMiddleware from "./middlewares/error-middleware";

dotenv.config();

const app = express();
app.use(json());
app.use(contactRouter);
app.use(errorHandlerMiddleware);

const port = +process.env.PORT || 5000;
app.listen(port, () => console.log("Server is up and running on port " + port));