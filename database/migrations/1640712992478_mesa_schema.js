"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MesaSchema extends Schema {
  up() {
    this.create("mesas", (table) => {
      table.increments();
      table.integer("number").notNullable();
      table.bigInteger("code").unique().notNullable();
      table.boolean("busy").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("mesas");
  }
}

module.exports = MesaSchema;