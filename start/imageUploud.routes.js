const Route = use("Route");

Route.group(() => {
  Route.resource("/upload", "ImageController").apiOnly();
}).prefix("/api/v1/");