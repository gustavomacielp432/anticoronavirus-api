

module.exports = {
  client: 'postgresql',
  connection: {
      database: 'trabalhocovid19',
      user: 'postgres',
      password: 'mae*963,'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
