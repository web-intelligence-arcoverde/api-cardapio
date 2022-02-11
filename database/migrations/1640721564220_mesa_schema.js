"use strict";

const Schema = use("Schema");

class MesaSchema extends Schema {
  up() {
    this.create("mesas", (table) => {
      table.increments();

      table.integer("number").unique().notNullable();
      table.string("code").unique().notNullable();
      table.boolean("busy").defaultTo(false);

      table.timestamps();
    });
  }

  down() {
    this.drop("mesas");
  }
}

module.exports = MesaSchema;
