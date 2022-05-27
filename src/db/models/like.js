import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const Like = sequelize.define(
  "like",
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

export default Like;
