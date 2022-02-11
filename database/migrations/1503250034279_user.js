"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("nome", 80).notNullable();
      table
        .integer("id_cargo")
        .unsigned()
        .notNull()
        .references("id")
        .inTable("cargos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.string("email", 254).notNullable().unique();
      table.string("password", 22).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
