const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        try {
            existsOrError(user.nome, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.senha, 'senha não informada')
            existsOrError(user.confirmaSenha, 'senha não confere')
            existsOrError(user.telefone, 'telefone não informado')
            existsOrError(user.cpf, 'cpf não informado')
            existsOrError(user.rg, 'rg não informado')
            existsOrError(user.dataDoExame, 'data nao informada')
            existsOrError(user.ResultadoDoExame, 'ResultadoDoEx ame!')
            existsOrError(user.idade, 'idade nao informada')
            existsOrError(user.cidade, 'cidade não informado')
            existsOrError(user.bairro, 'bairro não informado')
            existsOrError(user.rua, 'rua não informado')
            existsOrError(user.numero, 'numero não informado')
            existsOrError(user.complemento, 'complemento não informado')
            
            const userFromDB = await app.db('usuarios')
                .where({ cpf: user.cpf }).first()
            if (!user.cpf) {
                notExistsOrError(userFromDB, 'Usuario ja cadastrado')
            }
        } catch (err) {
            return res.status(400).send(err)
        }
        //  user.senha = encryptPassword(user.password)
        //  user.confirmaSenha = encryptPassword(user.password)
        //  delete user.confirmaSenha

        if (user.id) {
           // res.send(user)
            app.db('usuarios')
                .update(user)
                .where({ cpf: user.cpf })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                 console.log('Usuário atualizado com sucesso!')
                
        } else {
           // res.send(user)
            app.db('usuarios')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                console.log('Usuário cadastrado com sucesso!')
        }

    }

    const get = (req, res) => {
        app.db('usuarios')
            .select('*')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
     
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

     

    return { save, get, getById }

}