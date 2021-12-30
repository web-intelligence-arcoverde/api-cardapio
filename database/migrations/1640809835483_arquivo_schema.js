"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ArquivoSchema extends Schema {
  up() {
    this.create("arquivos", (table) => {
      table.increments();

      table.string("nome");
      table.string("key");
      table.string("url");
      table.string("content_type");

      table.timestamps();
    });
  }

  down() {
    this.drop("arquivos");
  }
}

module.exports = ArquivoSchema;
