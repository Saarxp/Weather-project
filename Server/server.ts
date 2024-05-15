import express from "express";
import userRouter from "./routes/userRouter";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalErrorHandler from "./errorHandlers/globalErrorHandler";

export default function createServer() {
  dotenv.config();
  const app = express();

  app.use(cookieParser());
  app.use(express.static("public"));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(globalErrorHandler);
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use("/users", userRouter);

  return app;
}
