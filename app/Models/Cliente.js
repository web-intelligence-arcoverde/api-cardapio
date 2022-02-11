"use strict";

const Model = use("Model");

class Cliente extends Model {
  mesa() {
    return this.hasOne("App/Models/Mesa");
  }
}

module.exports = Cliente;
