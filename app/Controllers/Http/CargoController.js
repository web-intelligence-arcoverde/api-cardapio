"use strict";
const Cargo = use("App/Models/Cargo");

class CargoController {
  async index({ response }) {
    try {
      const cargos = await Cargo.all();
      return cargos;
    } catch (error) {
      response.status(401).send({
        error,
      });
    }
  }

  async store({ request, response }) {
    try {
      const { nome } = request.all();

      if (!nome) {
        return response.status(401).send({
          error: {
            message: "Atributos não foram passados.",
          },
        });
      }

      const isExistRole = await Cargo.findBy("nome", nome);

      if (isExistRole) {
        return response.status(401).send({
          error: {
            message: "Cargo já existe.",
          },
        });
      }

      const cargo = await Cargo.create({
        nome,
      });

      await cargo.save();

      return cargo;
    } catch (error) {}
  }

  async show({ params, response }) {
    try {
      const { id } = params;

      const cargo = await Cargo.find(id);

      if (!cargo) {
        return response.status(403).send({
          error: {
            message: "Cargo não existe.",
          },
        });
        return;
      }

      return cargo;
    } catch (error) {}
  }

  async update({ params, request, response }) {
    try {
      const { id } = params;
      const cargo = await Cargo.find(id);

      if (!cargo) {
        return response.status(401).send({
          error: {
            message: "Cargo não existe",
          },
        });
      }

      const { nome } = await request.all();

      if (!nome) {
        return response.status(401).send({
          message: "Atributos não foram passados.",
        });
      }

      await cargo.merge({ nome });

      await cargo.save();

      return cargo;
    } catch (error) {}
  }

  async destroy({ params, response }) {
    try {
      const cargo = await Cargo.find(params.id);

      if (!cargo) {
        return response.status(403).send({
          error: {
            message: "Cargo não existe.",
          },
        });
      }

      await cargo.delete();
    } catch (error) {}
  }

  async filter({}) {}
}

module.exports = CargoController;
