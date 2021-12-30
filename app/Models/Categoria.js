"use strict";

const Model = use("Model");

class Categoria extends Model {
  produto() {
    return this.hasOne("App/Models/Produto");
  }
}

module.exports = Categoria;
