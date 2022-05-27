import cors from "cors";
import express from "express";
import { testDB } from "./db/index.js";
import productRouter from "./services/product/index.js";
import reviewRouter from "./services/review/index.js";
import sequelize from "./db/index.js";
import categoryRouter from "./services/categories/index.js";
import usersRouter from "./services/users/index.js";
import likeRouter from "./services/like/index.js";
import cartRouter from "./services/cart/index.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use("/products", productRouter);
server.use("/reviews", reviewRouter);
server.use("/categories", categoryRouter);
server.use("/users", usersRouter);
server.use("/likes", likeRouter);
server.use("/cart", cartRouter);

const { PORT = 5001 } = process.env;

const initialize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log("Server is listening on port " + PORT);
      await testDB();
      await sequelize.sync();
    });
    server.on("error", (error) => {
      console.log("Server is not running due to error: " + error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
initialize();
