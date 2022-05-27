import express from "express";
import models from "../../db/models/index.js";
const { Like } = models;

const likeRouter = express.Router();

likeRouter.get("/", async (req, res, next) => {
  try {
    const likes = await Like.findAll();
    res.send(likes);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

likeRouter.get("/:id", async (req, res, next) => {
  try {
    const like = await Like.findByPk(req.params.id, {
      /* include: Product, */
    });
    if (!like) {
      res.status(404).send("Not found, sorry");
    } else {
      res.send(like);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

likeRouter.post("/", async (req, res, next) => {
  try {
    const like = await Like.create(req.body);
    res.send(like);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default likeRouter;
