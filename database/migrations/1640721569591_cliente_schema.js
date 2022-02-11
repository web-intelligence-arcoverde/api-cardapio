"use strict";

const Schema = use("Schema");

class ClienteSchema extends Schema {
  up() {
    this.create("clientes", (table) => {
      table.increments();
      table.string("nome");
      table
        .integer("id_mesas")
        .unsigned()
        .notNull()
        .references("id")
        .inTable("mesas")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("clientes");
  }
}

module.exports = ClienteSchema;
