exports.up = function(knex) {
    return knex.schema.createTable('usuarios', table=> {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('email').notNull().unique()
        table.string('senha').notNull()
        table.string('confirmaSenha').notNull()
        table.string('telefone').notNull()
        table.integer('idade').notNull()
        table.string('cpf').notNull().unique()
        table.string('rg').notNull().unique()
        table.date('dataDoExame').notNull()
        table.boolean('ResultadoDoExame').notNull().defaultTo(true)
        table.string('cidade').notNull()
        table.string('bairro').notNull()
        table.string('rua').notNull()
        table.integer('numero').notNull()
        table.string('complemento').notNull()
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios')
};
