import express from "express";
import cors from "cors";
import statusRoutes from "./routes/statusRoutes";
import dataRoutes from "./routes/dataRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/status", statusRoutes);
app.use("/data", dataRoutes);

export default app;
