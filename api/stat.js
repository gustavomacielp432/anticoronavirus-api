module.exports = app => {
    const Stat = app.mongoose.model('Stat',{
        faqs:Number,
        lojas:Number,
        produtos:Number,
        usuarios:Number,
        criacao: Date
    })

    const get = (req, res)=> {
        Stat.findOne({}, {}, { sort: {'criacao':-1 }   })
            .then(stat => { 
                const valoresPadroes={
                    faqs:0,
                    lojas:0,
                    produtos:0,
                    usuarios:0,
                }
                res.json(stat || valoresPadroes )
            }) 
    }
    return {Stat, get}
}