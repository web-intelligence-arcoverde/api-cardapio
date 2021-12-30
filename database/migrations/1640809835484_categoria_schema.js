"use strict";

const Schema = use("Schema");

class CategoriaSchema extends Schema {
  up() {
    this.create("categorias", (table) => {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  }

  down() {
    this.drop("categorias");
  }
}

module.exports = CategoriaSchema;
