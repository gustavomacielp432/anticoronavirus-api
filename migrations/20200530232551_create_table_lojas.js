exports.up = function(knex, Promise) {
    return knex.schema.createTable('lojas', table => {
        table.increments('id').primary()
        table.string('loja').notNull()
        table.string('codigo').notNull()
        table.string('cidade').notNull()
        table.string('bairro').notNull()
        table.string('rua').notNull()
        table.string('numero').notNull()
        table.integer('idProduto').references('id')
            .inTable('produtos').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('lojas')

};
