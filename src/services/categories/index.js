import express from "express";
import models from "../../db/models/index.js";
const { Category } = models;

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    console.log(error);
    next(err);
  }
});

categoryRouter.post("/bulk", async (req, res, next) => {
  try {
    const newCategopries = await Category.bulkCreate([
      { name: "Shoes" },
      { name: "Tshirts" },
      { name: "Shorts" },
      { name: "Athletics" },
      { name: "Outdoor" },
      { name: "Hiking" },
    ]);
    res.send(newCategopries);
  } catch (error) {
    console.log(error);
    next(err);
  }
});

export default categoryRouter;
