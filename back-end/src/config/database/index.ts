export default {
  development: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: process.env.SEQUELIZE_HOST,
    dialect: process.env.SEQUELIZE_DIALECT,
    define: {
      timestamps: false,
      underscored: true,
    },
  },
};
