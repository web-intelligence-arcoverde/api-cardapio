const Route = use("Route");

Route.group(() => {
  Route.resource("/categoria", "CategoriaController").apiOnly();
}).prefix("/api/v1/");
