import { Sequelize } from "sequelize";

const { PGHOST, PGPORT, PGUSER, PGDATABASE, PGPASSWORD } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
  logging: false,
  dialectOptions: {},
});

export const testDB = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("DB connections is ok");
  } catch (error) {
    console.log("DB connection failed");
  }
};

export default sequelize;
