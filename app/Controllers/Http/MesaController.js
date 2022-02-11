"use strict";

const Table = use("App/Models/Mesa");
const Cliente = use("App/Models/Cliente");

let charset =
  "abcdefgh123456789ABCDEDYSADO002908458599441569abdilgopf/*-+@#$%&*";

class MesaController {
  async store({ request, response }) {
    const { number } = request.all();

    const table = await Table.findBy("number", number);

    if (table) {
      response.status(400).send({
        message: "Está mesa já existe no sistema.",
      });
    } else {
      let code = "";
      for (let i = 0, n = charset.length; i < 6; i++) {
        code += charset.charAt(Math.floor(Math.random() * n));
      }

      const table = await Table.create({ number, code });

      table.save();

      response.status(200).send({
        message: "Mesa cadastrada com sucesso.",
      });
    }
  }

  async index() {
    const tables = await Table.all();
    return tables;
  }

  async show({ params, response }) {
    try {
      const { id } = params;

      const mesa = await Table.find(id);

      if (!mesa) {
        return response.status(403).send({
          error: {
            message: "Mesa não existe.",
          },
        });
      }
      return mesa;
    } catch (error) {
      response.status(400).send({
        error,
      });
    }
  }

  async findClientsByTableId({ params }) {
    try {
      const { id } = params;

      console.log(id);
      const clientes = await Cliente.findBy("id_mesas", id);

      console.log(clientes);
    } catch (error) {}
  }

  async update({ params, request, response }) {
    const { id } = params;
    const { number, busy } = request.all();

    const table = await Table.find(id);

    if (!table) {
      return response.status(403).send({
        error: {
          message: "Mesa não existe.",
        },
      });
    }

    if (number) {
      const isExistTableNumber = await Table.findBy("number", number);

      if (isExistTableNumber) {
        if (isExistTableNumber.id !== table.id) {
          return response.status(403).send({
            message: "Esse numero de mesa ja existe",
          });
        }
      }
    }

    table.number = number;
    table.busy = busy;

    await table.save();

    return response.status(200).send({
      message: "Mesa atualizada",
    });
  }

  async destroy({ params, response }) {
    try {
      const table = await Table.find(params.id);

      if (!table) {
        return response.status(403).send({
          error: {
            message: "Mesa não existe.",
          },
        });
      }

      const user = await Cliente.findBy("id_mesas", table.id);

      if (user) {
        await user.delete();
      }

      await table.delete();

      return response.status(200).send({
        message: "Mesa excluida",
      });
    } catch (error) {
      response.status(400).send(error);
    }
  }
}

module.exports = MesaController;
