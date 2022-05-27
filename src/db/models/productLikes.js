import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const ProductLikes = sequelize.define(
  "productLikes",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    timestamps: false,
  }
);

export default ProductLikes;
