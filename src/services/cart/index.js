import express from "express";

import models from "../../db/models/index.js";
import sequelize from "sequelize";
const { Cart, Product, User } = models;

const cartRouter = express.Router();

cartRouter.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [
        {
          model: Product,
        },
      ],
      attributes: [
        "productId",
        [sequelize.fn("COUNT", sequelize.col("cart.id")), "quantity"],
        [sequelize.fn("SUM", sequelize.col("product.price")), "total"],
      ],
      group: ["productId", "product.id"],
      where: { userId: req.params.userId },
    });
    const totalQuantity = await Cart.count({
      where: { userId: req.params.userId },
    });
    const totalPrice = await Cart.sum("product.price", {
      include: { model: Product, attributes: [] },
    });
    res.send({ cart, totalQuantity, totalPrice });
  } catch (err) {
    next(err);
  }
});

cartRouter.post("/", async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.create({ userId, productId });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

cartRouter.delete("/:userId/:productId", async (req, res, next) => {
  try {
    const cart = await Cart.destroy({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
      },
    });
    res.send({ cart });
  } catch (err) {
    next(err);
  }
});

export default cartRouter;
