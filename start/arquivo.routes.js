const Route = use("Route");

Route.group(() => {
  Route.resource("/arquivo", "ArquivoController").apiOnly();
}).prefix("/api/v1/");
