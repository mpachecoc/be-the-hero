// What is the migration going to execute...
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

// If I want to unmake what the migration did, I have to execute...
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
