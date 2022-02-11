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
    const { nome, numero_mesa } = request.all();

    if (!nome || !numero_mesa) {
      return response.status(403).send({
        message: "Atributos não foram passados.",
      });
    }

    const findTable = await Table.findBy("number", numero_mesa);

    if (!findTable) {
      return response.status(403).send({
        message: "Mesa não existe.",
      });
    }

    if (findTable.busy) {
      return response.status(401).send({
        message: "Mesa ocupada.",
      });
    }

    findTable.merge({ busy: true });

    const client = await Client.create({
      nome,
      id_mesas: findTable.id,
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
        message: "Usuário não existe.",
      });
    }

    return user;
  }

  async update({ params, request, response }) {
    const { id } = params;

    const cliente = await Client.find(id);

    if (!cliente) {
      return response.status(403).send({
        message: "Cliente nao existe",
      });
    }

    const findTable = await Table.find(cliente.id_mesas);
    const { numero_mesa, nome } = await request.all();

    if (numero_mesa && findTable.number !== numero_mesa) {
      const newTable = await Table.findBy("number", numero_mesa);

      if (!newTable) {
        return response.status(403).send({
          message: "Essa mesa nao existe",
        });
      }

      if (newTable.busy) {
        return response.status(403).send({
          message: "A nova mesa esta ocupada",
        });
      }

      await findTable.merge({ busy: false });
      await findTable.save();

      await newTable.merge({ busy: true });
      await newTable.save();

      cliente.id_mesas = newTable.id;
    }

    await cliente.merge({ nome });

    await cliente.save();
    return response.status(200).send({
      message: "Informacoes do Cliente atualizadas",
    });
  }

  async destroy({ params, response }) {
    const user = await Client.find(params.id);

    if (!user) {
      return response.status(403).send({
        message: "Usuário não existe.",
      });
    }

    if (user.id_mesas) {
      const table = await Table.find(user.id_mesas);

      table.busy = false;

      await table.save();
    }

    await user.delete();

    return response.status(200).send({
      message: "Cliente excluido",
    });
  }
}

module.exports = ClienteController;
