const Route = use("Route");

Route.group(() => {
  Route.resource("mesa", "MesaController").apiOnly();
}).prefix("/api/v1/");
