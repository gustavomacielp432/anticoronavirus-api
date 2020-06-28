
exports.up = function(knex, Promise) {
    return knex.schema.createTable('locais_visitados', table => {
        table.increments('id').primary()
        table.integer('user_id').notNull()
        table.string('cep').notNull()
        table.string('lat').notNull()
        table.string('lng').notNull()
    })
};

exports.down = function(knex, Promise) {

};