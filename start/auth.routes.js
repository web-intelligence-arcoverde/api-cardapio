const Route = use("Route");

Route.post("auth", "AuthController.auth").prefix("/api/v1/");
