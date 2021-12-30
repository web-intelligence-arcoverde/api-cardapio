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
}).prefix("api/v1");
