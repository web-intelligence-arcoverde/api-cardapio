"use strict";

const Table = use("App/Models/Mesa");

let charset =
  "abcdefgh123456789ABCDEDYSADO002908458599441569abdilgopf/*-+@#$%&*";

class MesaController {
  async store({ request, response }) {
    const { number } = request.all();

    const table = await Table.findBy("number", number);

    if (table) {
      response.status(400).send({
        error: {
          message: "Está mesa já existe no sistema.",
        },
      });
    } else {
      let code = "";
      for (let i = 0, n = charset.length; i < 6; i++) {
        code += charset.charAt(Math.floor(Math.random() * n));
      }

      const table = await Table.create({ number, code });

      table.save();

      response.status(200).send({
        error: {
          message: "Mesa cadastrada com sucesso.",
        },
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

      const table = await Table.find(id);

      if (!table) {
        return response.status(403).send({
          error: {
            message: "Mesa não existe.",
          },
        });
      }
      return mesas;
    } catch (error) {
      response.status(400).send({
        error,
      });
    }
  }

  async update({ params, request, response }) {
    const table = await Table.findByOrFail("id", params.id);

    if (!table) {
      return response.status(403).send({
        error: {
          message: "Mesa não existe.",
        },
      });
    }

    const data = await request.only(["number", "code", "busy"]);

    table.number = data.number;
    table.code = data.code;
    table.busy = data.busy;

    await table.save();

    return response.json(table);
  }

  async destroy({ params, response }) {
    try {
      const table = await Table.findByOrFail("id", params.id);

      const user = await Client.findBy("id_table", table.id);

      if (user) {
        await user.delete();
      }

      if (!table) {
        return response.status(403).send({
          error: {
            message: "Mesa não existe.",
          },
        });
      }

      await table.delete();
    } catch (error) {
      response.status(400).send(error);
    }
  }
}

module.exports = MesaController;
