module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const faq = { ...req.body }
        if(req.params.id) faq.id = req.params.id
        console.log(faq)
        try {
            existsOrError(faq.titulo, 'titulo não informado')
            existsOrError(faq.categoria, 'Categoria não informada')
            existsOrError(faq.conteudo, 'Conteúdo não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(faq.id) {
            app.db('faq')
                .update(faq)
                .where({ id: faq.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
        
            app.db('faq')
                .insert(faq)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('faq')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'FAQ não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('faq').count('id').first()
        const count = parseInt(result.count)

        app.db('faq')
            .select('id', 'titulo', 'categoria')
            .limit(limit).offset(page * limit - limit)
            .then(faq => res.json({ data: faq, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    // const getById = (req, res) => {
    //     app.db('faq')
    //         .select('*')
    //         .where({ id: req.params.id })
    //         .first()
    //         .then(faq => res.json(faq))
    //         .catch(err => res.status(500).send(err))
    // }

    const getById = (req, res) => {
        app.db('faq')
            .where({ id: req.params.id })
            .first()
            .then(faq => {
                faq.titulo = faq.titulo.toString()
                return res.json(faq)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)
 


        app.db({a: 'faq'})
            .select('faq.id', 'faq.titulo', 'faq.categoria', 'faq.conteudo')
            .limit(limit).offset(page * limit - limit)
            .whereIn('categoryId', ids)
            .orderBy('faq.id', 'desc')
            .then(faq => res.json(faq))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}