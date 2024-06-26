import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());

const port = +process.env.PORT || 5000;
app.listen(port, () => console.log("Server is up and running on port " + port));