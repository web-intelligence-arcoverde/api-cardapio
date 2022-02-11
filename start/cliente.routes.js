const Route = use("Route");

Route.group(() => {
  Route.resource("/cliente", "ClienteController").apiOnly();
}).prefix("/api/v1/");
