import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

import router from "./src/routes";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const configs: CorsOptions = {
  origin: ["*"],
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  preflightContinue: false,
  allowedHeaders: ["Authorization", "x-headers", "content-type"]
};
app.use(cors(configs));

//logger
const logger = morgan("dev");
app.use(logger);

app.use(express.static("./public/images"));

app.get("/", (req: Request, res: Response) => {
  res.send("Tes");
})

app.use('/api/v1', router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Backend successfully running on port ${PORT}`);
});

export default app;