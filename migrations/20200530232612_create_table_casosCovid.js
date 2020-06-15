exports.up = function(knex, Promise) {
    return knex.schema.createTable('casoscovid', table=> {
        table.increments('id').primary()
        table.boolean('casoConfirmado').notNull().defaultTo(true)
        table.integer('codigocasoconfirmado').notNull()
        table.integer('usuarioId').references('id').inTable('usuarios')

        
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('casoscovid')

};
