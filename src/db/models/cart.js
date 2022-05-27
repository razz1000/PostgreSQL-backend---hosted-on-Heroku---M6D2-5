import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const Cart = sequelize.define(
  "cart",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { timestamps: false }
);

export default Cart;
