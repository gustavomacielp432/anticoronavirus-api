module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const save = async (req, res) => {
    const local = { ...req.body };
    console.log(local)
    app
      .db("locais_visitados")
      .insert(local)
      .then((_) => {
        res.status(204).send();
        console.log("Local cadastrado com sucesso!");
      })
      .catch((err) => res.status(500).send(err));
  };
  const get = async (req, res) => {
    app
      .db("locais_visitados")
      .select("*")
      .then((locais) => res.json(locais))
      .catch((err) => res.status(500).send(err));
  };

  return { save, get };
};
