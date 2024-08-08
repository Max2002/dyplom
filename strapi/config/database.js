const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      database: "dyplom",
      user: "postgres",
      password: '060802',
    },
    useNullAsDefault: true,
  },
});
