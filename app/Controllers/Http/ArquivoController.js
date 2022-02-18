class ArquivoController {
  async index({ request, response, view }) {}

  async store({ request, response }) {
    var arquivo;
    await request.multipart
      .file("image", {}, async (file) => {
        arquivo = file;
      })
      .process();
    console.log(arquivo);
    // const imageEnconded = new Buffer.from(url).toString("base64");

    //return imageEnconded;
  }

  async findByName({ params, request, response }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ArquivoController;
