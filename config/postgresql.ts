import knex from "knex";

const knexInstance = knex({
  client: "postgresql",
  connection: {
    database: "car_binar",
    user: "postgres",
    password: "admin",
  },
});

export default knexInstance;