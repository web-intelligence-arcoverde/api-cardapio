const Drive = use("Drive");
const File = use("App/Models/Arquivo");

class ArquivoController {
  async index({ request, response, view }) {}

  async store({ request, response }) {
    request.multipart.file("image", {}, async (file) => {
      try {
        const ContentType = file.headers["content-type"];
        const ACL = "public-read";
        const key = `${(Math.random() * 100).toString(32)}- ${file.clientName}`;

        const url = await Drive.put(key, file.stream, {
          ContentType,
          ACL,
        });

        console.log(url);
      } catch (error) {
        return response.state(error.status).send({
          error: {
            messsage: "Não foi possivel",
          },
        });
      }
    });
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ArquivoController;
