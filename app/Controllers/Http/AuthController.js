"use strict";

class AuthController {
  async login({ auth, request, response }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }

  async logout({ auth, request, response }) {
    await auth.logout();
    return response.send("deslogado com sucesso");
  }
}

module.exports = AuthController;
