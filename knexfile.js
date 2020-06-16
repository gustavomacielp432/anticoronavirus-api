module.exports = {
  client: "postgresql",
  connection: {
    host: "anticoronavirus.postgres.database.azure.com",
    port: '5432',
    database: "anticoronavirus",
    user: "corona@anticoronavirus",
    password: "Virus123",
    ssl: true
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
