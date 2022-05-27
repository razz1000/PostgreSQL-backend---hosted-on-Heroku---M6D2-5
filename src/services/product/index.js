import express from "express";
import sequelize from "../../db/index.js";
import models from "../../db/models/index.js";
import { Op } from "sequelize";
import { query } from "express";

const { Product, Review, Category, User, ProductCategory, Like } = models;
const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: req.query.search && {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },

          /* {
            "$category.name$": {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
 */
          /*           {
            $price$: 22, // This one does not seem to work. Ask why.
          }, */
        ],
      },

      include: [
        {
          model: Review,
          include: { model: User, attributes: ["name", "lastName", "id"] },
        },

        {
          model: Category,
          through: { attributes: [] },
          /*   where: req.query.category
            ? {
                name: { [Op.iLike]: "%" + req.query.category + "%" },
              }
            : {},
      */
        },

        {
          model: User,
          through: { attributes: [] },
          as: "likes",
        },
      ],

      /*         {
          model: User,
          through: { attributes: [] },
          as: "likes",
          attributes: [
            "id",
            [sequelize.fn("count", sequelize.col("likes.id")), "unitQty"],
          ],

          group: ["likesId", "likes.id"],

          where: {
            likesId: req.params.usersId,
          },
        },
 */
      /*       offset: req.query.limit * req.query.offset,
      limit: req.query.limit,
      order: [["name", "ASC"]], */
    });
    res.send(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/* productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.send(product);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}); */

productRouter.get("/sortbycategory", async (req, res, next) => {
  try {
    const product = await Product.findAll({
      include: Category,

      attributes: [
        "categoryId",
        [sequelize.fn("count", "id"), "total_products"],
      ],
      group: ["categoryId", "category.id"],
      order: ["total_products", "DESC"],
    });

    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.send(product);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, image, price, categories } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      image,
      price,
    });
    const productId = newProduct.id;
    const data = [];
    if (categories) {
      categories.forEach((categoryId) => {
        data.push({ productId, categoryId });
      });
      await ProductCategory.bulkCreate(data);

      res.send(newProduct);
    } else {
      res.send(newProduct);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = Product.destroy({
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

export default productRouter;
