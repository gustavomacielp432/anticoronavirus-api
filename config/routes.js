module.exports = (app) => {
  app.route("/usuarios").post(app.api.user.save).get(app.api.user.get);

  app.route("/usuarios/:id").put(app.api.user.save);

  app.route("/produtos").post(app.api.produtos.save).get(app.api.produtos.get);

  app.route("/produtos/:id").put(app.api.produtos.save);

  app.route("/lojas").post(app.api.lojas.save).get(app.api.lojas.get);

  app.route("/lojas/:id").put(app.api.lojas.save);

  app.route("/casos").post(app.api.casos.save).get(app.api.casos.get);

  app.route("/casos/:id").put(app.api.casos.save);

  app.route("/stats").get(app.api.stat.get);

  app.route("/faqs").post(app.api.faqs.save).get(app.api.faqs.get);

  app.route("/faqs/:id").put(app.api.faqs.save).get(app.api.faqs.getById);

  app
    .route("/localVisitado")
    .post(app.api.locaisVisitados.save)
    .get(app.api.locaisVisitados.get);

  
  app.route("/lastLocaisVisitados").get(app.api.locaisVisitados.getLastLocais);
};
