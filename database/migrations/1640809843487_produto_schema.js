"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProdutoSchema extends Schema {
  up() {
    this.create("produtos", (table) => {
      table.increments();

      table.string("nome");
      table.string("imagem");

      table
        .integer("categorias_id")
        .unsigned()
        .notNull()
        .references("id")
        .inTable("categorias")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("produtos");
  }
}

module.exports = ProdutoSchema;
