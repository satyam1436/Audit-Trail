import express from "express";
import cors from "cors";
import eventTestRoutes from "./routes/eventTestRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Audit Trail backend is running",
  });
});


app.use("/api/v1/test", eventTestRoutes);

export default app;

