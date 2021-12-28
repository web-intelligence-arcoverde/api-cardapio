"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ClienteSchema extends Schema {
  up() {
    this.create("clientes", (table) => {
      table.increments();
      table
        .integer("table_id")
        .unsigned()
        .references("id")
        .inTable("tables")
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
