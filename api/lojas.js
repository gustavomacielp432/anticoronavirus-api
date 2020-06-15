module.exports = app => {
    const { existsOrError, notExistsOrError,equalsOrError } = app.api.validation
 
    const save = async (req, res) => {
      
        const lojas = { ...req.body }
        if (req.params.id) lojas.id = req.params.id
       
        try {
            console.log('entrei no try')

            existsOrError(lojas.loja, 'Loja da não informado')
            existsOrError(lojas.codigo, 'Codigo da não informado')
            existsOrError(lojas.cidade, 'cidade não informado')
            existsOrError(lojas.bairro, 'bairro  nao informado')
            existsOrError(lojas.rua, 'rua não informada')
            existsOrError(lojas.numero, 'numero não informada')
            existsOrError(lojas.idProduto, 'id do prodduto nao informado')
        
            const lojasFromDB = await app.db('lojas')
                .where({codigo: lojas.codigo }).first()
            if (!lojas.codigo) {
                notExistsOrError(lojasFromDB, 'lojas ja cadastrado')
            }
        } catch (err) {
            console.log(err)
            return res.status(400).send(err)
        }

        if (lojas.id) {
            console.log('entrei no UPDATE')
            console.log(lojas)
           // res.send(lojas)
            app.db('lojas')
                .update(lojas)
                .where({ id: lojas.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                 console.log('lojas atualizado com sucesso!')
                
        } else {
            console.log('entrei no insert')
            console.log(lojas)
            app.db('lojas')
                .insert(lojas)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                console.log('lojasS cadastrado com sucesso!')
        }

    }

        const get = (req, res) => {
            app.db('lojas')
                .select('*')
                .innerJoin('produtos', 'produtos.id','=', 'lojas.idProduto')
                .then(lojass => res.json(lojass))
                .catch(err => res.status(500).send(err))
        }

    return { save,get   }

}