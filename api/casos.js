module.exports = app => {
    const { existsOrError, notExistsOrError,equalsOrError } = app.api.validation
 
    const save = async (req, res) => {
      
        const caso = { ...req.body }
        if (req.params.id) caso.id = req.params.id
       
        try {
            console.log('entrei no try')
            existsOrError(caso.casoConfirmado ,'Id do usuario não informado')
            existsOrError(caso.codigocasoconfirmado ,'Id do usuario não informado')
            existsOrError(caso.usuarioId ,'Id do usuario não informado')
          
                    
            const casoFromDB = await app.db('casoscovid')
                .where({ codigocasoconfirmado: caso.codigocasoconfirmado }).first()
            if (!caso.codigocasoconfirmado) {
                notExistsOrError(casoFromDB, 'caso ja cadastrado')
            }
        } catch (err) {
            console.log(err)
            return res.status(400).send(err)
        }

        if (caso.id) {
            console.log('entrei no UPDATE')
            console.log(caso)
           // res.send(caso)
            app.db('casoscovid')
                .update(caso)
                .where({ id: caso.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                 console.log('caso atualizado com sucesso!')
                
        } else {
            console.log('entrei no insert')
            //res.send(caso)
            app.db('casoscovid')
                .insert(caso)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                console.log('casoS cadastrado com sucesso!')
        }

    }

        const get = (req, res) => {
            app.db('casoscovid')
                .select('*')
                .then(casos => res.json(casos))
                .catch(err => res.status(500).send(err))
        }

    return { save,get   }

}