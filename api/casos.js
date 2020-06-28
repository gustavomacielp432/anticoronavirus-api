module.exports = (app) => {
    const axios = require("axios");
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const save = async (req, res) => {
    const caso = { ...req.body };
    if (req.params.id) caso.id = req.params.id;

    try {
      console.log("entrei no try");
      existsOrError(caso.casoConfirmado, "Id do usuario não informado");
      existsOrError(caso.codigocasoconfirmado, "Id do usuario não informado");
      existsOrError(caso.usuarioId, "Id do usuario não informado");

      const casoFromDB = await app
        .db("casoscovid")
        .where({ codigocasoconfirmado: caso.codigocasoconfirmado })
        .first();
      if (!caso.codigocasoconfirmado) {
        notExistsOrError(casoFromDB, "caso ja cadastrado");
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    if (caso.id) {
      console.log("entrei no UPDATE");
      console.log(caso);
      // res.send(caso)
      app
        .db("casoscovid")
        .update(caso)
        .where({ id: caso.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
      console.log("caso atualizado com sucesso!");
    } else {
      console.log("entrei no insert");
      //res.send(caso)
      app
        .db("casoscovid")
        .insert(caso)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
      console.log("casoS cadastrado com sucesso!");
    }
  };

  const get = (req, res) => {
    app
      .db("casoscovid")
      .select("*")
      .then((casos) => res.json(casos))
      .catch((err) => res.status(500).send(err));
  };

  const hospitaisProximos = (req, res) => {
    const localizacao = { ...req.query };
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDRYA4kZPf8A9E5E-_Oj7csLiRmppBRSV8&location=${localizacao.lat},${localizacao.lng}&radius=5000&type=hospital&language=pt-BR&opennow=true&distance=true`;
    console.log(url)
    let config = {
      method: "get",
      url: url,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        res.json(response.data.results)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const hospitalMaisProximo = (req, res) => {
    const localizacao = { ...req.query };
    let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyDRYA4kZPf8A9E5E-_Oj7csLiRmppBRSV8&language=pt-BR&input=hospital&inputtype=textquery&locationbias=point:${localizacao.lat},${localizacao.lng}&fields=photos,formatted_address,name,rating,opening_hours,geometry`;
      
    let config = {
      method: 'get',
      url: url,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
        res.json(response.data.candidates[0])
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  return { save, get, hospitaisProximos, hospitalMaisProximo };
};
