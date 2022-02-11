"use strict";

const User = use("App/Models/User");
const Cargo = use("App/Models/Cargo");

class UserController {
  async store({ request, response }) {
    const { nome, id_cargo, email, password } = request.all();

    if (!nome || !id_cargo || !email || !password) {
      return response.status(403).send({
        message: "Alguns atributos nao foram passados",
      });
    }

    const cargo = await Cargo.find(id_cargo);

    if (!cargo) {
      return response.status(403).send({
        message: "Cargo nao existe",
      });
    }

    const isExistEmail = await User.findBy("email", email);

    if (isExistEmail) {
      return response
        .status(403)
        .send({ message: "Esse email ja esta sendo usado" });
    }

    if (password.length < 6) {
      return response.status(403).send({
        message: "Senha muito pequena",
      });
    }

    if (password.length > 22) {
      return response.status(403).send({
        message: "Senha muito grande",
      });
    }

    const user = await User.create({ nome, id_cargo, email, password });

    return user;
  }

  async index() {
    try {
      const users = await User.all();

      return users;
    } catch (error) {}
  }

  async show({ params, response }) {
    try {
      const { id } = params;

      if (!id) {
        return response.status(403).send({
          message: "id do usuario nao foi passado",
        });
      }

      const user = await User.find(id);

      if (!user) {
        return response.status(403).send({
          message: "Usuario nao existe",
        });
      }

      const cargo = await Cargo.find(user.id_cargo);

      if (!cargo) {
        return response.status(403).send({
          message: "Cargo nao existe mais, atualize",
        });
      }

      user["cargo"] = cargo.nome;

      return user;
    } catch (error) {}
  }

  async update({ params, request, response }) {
    try {
      const { id } = params;

      if (!id) {
        return response.status(403).send({
          message: "Id nao foi localizado",
        });
      }

      const user = await User.find(id);

      if (!user) {
        return response.status(403).send({
          message: "Usuario nao existe",
        });
      }

      const { id_cargo, email } = request.all();

      if (id_cargo) {
        const cargo = await Cargo.find(id_cargo);

        if (!cargo) {
          return response.status(403).send({
            message: "Cargo nao existe",
          });
        }
      }

      if (email) {
        const isEmailExist = await User.findBy("email", email);

        if (isEmailExist) {
          return response.status(403).send({
            message: "Email ja existe em outro usuario",
          });
        }
      }

      await user.merge(request.all());

      await user.save();

      return response.status(200).send({ message: "Usuario atualizado" });
    } catch (error) {}
  }

  async destroy({ params, response }) {
    try {
      const { id } = params;

      if (!id) {
        return response.status(403).send({
          message: "id nao localizado",
        });
      }

      const user = await User.find(id);

      if (!user) {
        return response.status(403).send({
          message: "Usuario nao existe",
        });
      }
      await user.delete();

      return response.status(200).send({ message: "Usuario removido" });
    } catch (error) {}
  }
}

module.exports = UserController;
