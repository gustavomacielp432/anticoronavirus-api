module.exports = app => {
    const { existsOrError, notExistsOrError,equalsOrError } = app.api.validation
 
    const save = async (req, res) => {
      
        const produto = { ...req.body }
        if (req.params.id) produto.id = req.params.id
       
        try {
            console.log(produto)
            existsOrError(produto.nome, 'Nome não informado')
            existsOrError(produto.codigo, 'Codigo não informado')
            existsOrError(produto.tipoProduto, 'Tipo de produto')
            existsOrError(produto.marca, 'Marca não informada')
            existsOrError(produto.preco, 'Preco não informada')
        
            const produtoFromDB = await app.db('produtos')
                .where({ codigo: produto.codigo }).first()
            if (!produto.codigo) {
                notExistsOrError(produtoFromDB, 'Produto ja cadastrado')
            }
        } catch (err) {
            console.log('entrei no cath')
            return res.status(400).send(err)
        }

        if (produto.id) {
            //console.log('entrei no UPDATE')
             console.log(produto)
           res.send(produto)
            app.db('produtos')
                .update(produto)
                .where({ id: produto.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                 console.log('PRODUTOS atualizado com sucesso!')
                
        } else {
           // console.log('entrei no insert')
             res.send(produto)
            app.db('produtos')
                .insert(produto)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                console.log('PRODUTOS cadastrado com sucesso!')
        }

    }

        const get = (req, res) => {
            app.db('produtos')
                .select('*')
                .then(produtos => res.json(produtos))
                .catch(err => res.status(500).send(err))
        }

    return { save,get   }

}