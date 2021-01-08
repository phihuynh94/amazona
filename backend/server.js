import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const app = express();
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
