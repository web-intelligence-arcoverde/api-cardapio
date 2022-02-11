"use strict";

class AuthController {
  async auth({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = AuthController;
