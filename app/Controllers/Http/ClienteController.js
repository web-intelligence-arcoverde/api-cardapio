"use strict";

const Table = use("App/Models/Mesa");
const Client = use("App/Models/Cliente");

class ClienteController {
  async index({ response }) {
    try {
      const clients = await Client.all();
      return clients;
    } catch (error) {
      response.status(401).send({
        error,
      });
    }
  }

  async store({ request, response }) {
    const { name, number } = request.all();

    if (!number || !name) {
      return response.status(401).send({
        error: {
          message: "Atributos não foram passados.",
        },
      });
    }

    const findTable = await Table.findBy("number", number);

    if (!findTable) {
      return response.status(401).send({
        error: {
          message: "Mesa não existe.",
        },
      });
    }

    if (findTable.busy) {
      return response.status(401).send({
        error: {
          message: "Mesa ocupada.",
        },
      });
    }

    findTable.merge({ busy: true });

    const client = await Client.create({
      name,
      mesas_id: findTable.id,
    });

    await client.save();
    await findTable.save();

    return client;
  }

  async show({ params, response }) {
    const { id } = params;

    const user = await Client.find(id);

    if (!user) {
      return response.status(403).send({
        error: {
          message: "Usuário não existe.",
        },
      });
      return;
    }

    return user;
  }

  async update({ params, request, response }) {
    const client = await Client.findBy("id", params.id);

    if (!client) {
      return response.status(401).send({
        error: {
          message: "Cliente não existe.",
        },
      });
    }

    const { number, name } = await request.all();

    if (!number || !name) {
      return response.status(401).send({
        error: {
          message: "Atributos não foram passados.",
        },
      });
    }

    const findTable = await Table.findBy("number", number);

    if (!findTable) {
      return response.status(401).send({
        error: {
          message: "Tabela não existe.",
        },
      });
    }

    if (findTable.id !== client.id_table) {
      const beforeTable = await Table.findBy("id", client.id_table);

      beforeTable?.merge({ busy: false });

      await beforeTable?.save();

      if (findTable?.busy) {
        return response.status(401).send({
          error: {
            message: "Essa mesa está ocupada.",
          },
        });
      } else {
        findTable.merge({ busy: true });
        client.id_table = findTable.id;
      }
    }

    client.merge({ name });

    await client.save();
    await findTable.save();

    return response.json(client);
  }

  async destroy({ params, response }) {
    const user = await Client.findByOrFail("id", params.id);

    if (!user) {
      return response.status(403).send({
        error: {
          message: "Usuário não existe.",
        },
      });
    }

    await user.delete();
  }
}

module.exports = ClienteController;
