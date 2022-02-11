const Route = use("Route");

Route.group(() => {
  Route.resource("/cargo", "CargoController").apiOnly();
}).prefix("/api/v1/");
