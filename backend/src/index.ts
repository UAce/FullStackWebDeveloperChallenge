import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { init } from "./common/corpusLoader";
import operationRoutes from "./routes/operations";

dotenv.config();

const host: string = process.env.HOST || "localhost";
const port = Number(process.env.PORT || "4000");
const app = express(); // Creates Express app

// Third-party Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Routes Middlewares
app.use("/health", (_: Request, res: Response) =>
  res.send("Server is running!")
);

app.use("/api", operationRoutes);

init()
  .then(() => {
    // Start server
    app.listen(port, host, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error(error.message);
  });
