"use strict";

const Model = use("Model");

class Mesa extends Model {
  clientes() {
    return this.hasMany("App/Models/Cliente");
  }
}

module.exports = Mesa;
