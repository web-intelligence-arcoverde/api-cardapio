const Route = use("Route");

Route.group(() => {
  Route.resource("/upload", "UploadfileController").apiOnly();
}).prefix("/api/v1/");
