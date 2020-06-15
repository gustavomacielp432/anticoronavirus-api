const schedule = require('node-schedule')

module.exports = app => {
schedule.scheduleJob('*/1 * * * *', async function(){
    const contCasos = await app.db('casoscovid').count('id').first()
    const contLojas = await app.db('lojas').count('id').first()
    const contProdutos = await app.db('produtos').count('id').first()
    const contUsuario = await app.db('usuarios').count('id').first()
 
    const {Stat} = app.api.stat
    const ultimoStats = await Stat.findOne({},{},
        {sort: {'criacao': -1 } })

    const stat = new Stat({
        casos: contCasos.count,
        lojas : contLojas.count,
        produtos : contProdutos.count,
        usuarios : contUsuario.count,
        criacao: new Date()
    })
    const verificaCasos = !ultimoStats || stat.casos !== ultimoStats.casos
    const verificaLojas = !ultimoStats || stat.lojas !== ultimoStats.casos
    const verificaProdutos = !ultimoStats || stat.produtos !== ultimoStats.casos
    const verificaUsuarios = !ultimoStats || stat.usuarios !== ultimoStats.casos
    
    if(verificaCasos || verificaLojas|| verificaProdutos|| verificaUsuarios )
        stat.save().then(() => console.log('Estatísticas atualizadas.'))
})

}