import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./src/config/db.js";
import apiRoutes from "./src/Routes/index.js";
import { notFound } from "./src/middleware/notFound.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? "*", credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});