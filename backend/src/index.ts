import express from "express";
import "reflect-metadata";
import "./container";
import weatherRoutes from "./routes/weather.routes";
import logRequest from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const port = process.env.PORT || 3000;

app.use(logRequest);
app.use(express.json());
app.use("/api/weather", weatherRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Weather backend running on http://localhost:${port}`);
});
