"use strict";

const Model = use("Model");

class Produto extends Model {
  categoria() {
    return this.hasOne("App/Models/Categoria");
  }
}

module.exports = Produto;
