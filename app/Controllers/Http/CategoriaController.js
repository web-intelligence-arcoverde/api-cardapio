"use strict";

const Categoria = use("App/Models/Categoria");

class CategoriaController {
  async index({ request, response, view }) {
    try {
      const categoria = await Categoria.all();
      return categoria;
    } catch (error) {}
  }

  async store({ request, response }) {
    try {
      const { name } = request.all();

      if (!name) {
        return response.status(403).send({
          message: "Atributo não foi enviado",
        });
      }

      const isExistCategory = await Categoria.findBy("name", name);

      if (isExistCategory) {
        return response.status(403).send({
          message: "Categoria ja existe",
        });
      }

      await Categoria.create({ name });

      return response.status(200).send({
        message: "Categoria criada",
      });
    } catch (error) {}
  }

  async show({ params, request, response, view }) {
    try {
      const { id } = params;

      const category = await Categoria.find(id);

      if (!category) {
        return response.status(403).send({
          message: "Categoria nao existe",
        });
      }

      return category;
    } catch (error) {}
  }

  async update({ params, request, response }) {
    try {
      const { id } = params;

      const category = await Categoria.find(id);

      if (!category) {
        return response.status(403).send({
          message: "Categoria nao existe",
        });
      }

      const { name } = await request.all();

      if (!name) {
        return response.status(403).send({
          message: "Atributo nao foi passado",
        });
      }

      const findNameCategoryExist = await Categoria.findBy("name", name);

      if (findNameCategoryExist) {
        return response.status(403).send({
          message: "Atributo nao foi passado",
        });
      }

      category.name = name;

      await category.save();

      return response.status(200).send({
        message: "Categoria atualizada",
      });
    } catch (error) {}
  }

  async destroy({ params, request, response }) {
    try {
      const { id } = params;

      const category = await Categoria.find(id);

      if (!category) {
        return response.status(403).send({
          message: "Categoria nao existe",
        });
      }

      await category.delete();

      return response.status(200).send({
        message: "categoria excluida",
      });
    } catch (error) {}
  }
}

module.exports = CategoriaController;
