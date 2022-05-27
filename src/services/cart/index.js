import express from "express";
import Category from "../../db/models/categories.js";
import models from "../../db/models/index.js";
const { Cart } = models;

const cartRouter = express.Router();

cartRouter.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({});
    res.send(cart);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

cartRouter.post("/:userId/:productId", async (req, res, next) => {
  try {
    const row = await Cart.create({
      userId: req.params.userId,
      productId: req.params.productId,
    });
    res.send(row);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default cartRouter;
