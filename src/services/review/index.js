import express from "express";
import models from "../../db/models/index.js";

const { Review, Product } = models;
const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const review = await Review.findAll({});
    res.send(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: Product,
    });
    if (!review) {
      res.status(404).send("Not found, sorry");
    } else {
      res.send(review);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewRouter.post("/", async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.send(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Review.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ rows });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default reviewRouter;
