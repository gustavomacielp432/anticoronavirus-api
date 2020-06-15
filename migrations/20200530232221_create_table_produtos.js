exports.up = function(knex, Promise) {
    return knex.schema.createTable('produtos', table =>{
        table.increments('id').unique().primary()
        table.string('nome').notNull()
        table.string('codigo').notNull()
        table.string('tipoProduto').notNull()
        table.string('marca').notNull()
        table.integer('preco').notNull() 
         
    })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('produtos')

};
