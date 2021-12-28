"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Cliente extends Model {
  mesa() {
    return this.hasOne("App/Models/Mesa");
  }
}

module.exports = Cliente;
