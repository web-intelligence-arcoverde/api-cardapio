const Route = use("Route");

Route.group(() => {
  Route.resource("/usuario", "UserController").apiOnly();
}).prefix("/api/v1/");
