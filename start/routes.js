"use strict";

const Route = use("Route");

Route.group(() => {
  Route.resource("client", "ClienteController").apiOnly();
}).prefix("api/v1");

Route.group(() => {
  Route.resource("table", "MesaController").apiOnly();
}).prefix("api/v1");

Route.group(() => {
  Route.resource("/files", "ArquivoController").apiOnly();
  Route.get("/find_file_by_name", "ArquivoController.findByName");
}).prefix("api/v1");
