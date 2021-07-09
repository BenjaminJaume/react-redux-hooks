require("dotenv").config();

module.exports = {
  development: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: "postgres",
  },
  init: {
    host: "localhost",
    port: "5432",
    username: "postgres",
    database: "rrh-test",
    password: "123456",
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,

    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
