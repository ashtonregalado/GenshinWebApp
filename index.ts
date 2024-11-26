//app.ts

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import charInfoRoutes from "./char_info";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", charInfoRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
