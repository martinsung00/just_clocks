import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static(path.resolve(__dirname, "../../dist")));

export default app;
