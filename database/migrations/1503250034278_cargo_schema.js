"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CargoSchema extends Schema {
  up() {
    this.create("cargos", (table) => {
      table.increments();
      table.string("nome", 50).notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("cargos");
  }
}

module.exports = CargoSchema;
