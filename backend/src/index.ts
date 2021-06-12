import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const host: string = process.env.HOST || "localhost";
const port = Number(process.env.PORT || "4000");
const app = express(); // Creates Express app

// Third-party Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes Middlewares
app.use("/health", (_: Request, res: Response) =>
  res.send("Server is running!")
);

// Start server
app.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
});
