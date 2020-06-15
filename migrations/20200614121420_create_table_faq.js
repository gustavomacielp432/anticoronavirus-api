
exports.up = function(knex, Promise) {
    return knex.schema.createTable('faq', table => {
        table.increments('id').primary()
        table.string('titulo').notNull()
        table.string('categoria').notNull()
        table.string('conteudo').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('faq')

};