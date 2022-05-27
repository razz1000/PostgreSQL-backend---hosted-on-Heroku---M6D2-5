import express from "express";
import models from "../../db/models/index.js";

const { User, Product } = models;

const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Product,
          through: { attributes: [] },
          as: "productlikes",
        },
      ],
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {});
    if (!user) {
      res.status(404).send("Not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
usersRouter.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
usersRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await User.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    });
    res.send(data[1][0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await User.destroy({
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

export default usersRouter;
