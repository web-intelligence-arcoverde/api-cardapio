const Route = use("Route");

Route.group(() => {
  Route.resource("mesa", "MesaController").apiOnly();
  Route.get("/clientes-mesa/:id", "MesaController.findClientsByTableId");
}).prefix("/api/v1/");
