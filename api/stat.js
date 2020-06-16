module.exports = app => {
    const get = async (req, res) => {
        const contLojas = await app.db('lojas').count('id').first()
        const contProdutos = await app.db('produtos').count('id').first()
        const contUsuario = await app.db('usuarios').count('id').first()
        const valores = {
            faqs:0,
            lojas:contLojas.count,
            produtos:contProdutos.count,
            usuarios:contUsuario.count,
        }

        res.json(valores)
    }
    return {get}
}