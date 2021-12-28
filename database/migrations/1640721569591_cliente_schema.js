"use strict";

const Schema = use("Schema");

class ClienteSchema extends Schema {
  up() {
    this.create("clientes", (table) => {
      table.increments();

      table
        .integer("mesas_id")
        .unsigned()
        .notNull()
        .references("id")
        .inTable("mesas")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.string("name");

      table.timestamps();
    });
  }

  down() {
    this.drop("clientes");
  }
}

module.exports = ClienteSchema;
