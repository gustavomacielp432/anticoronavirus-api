const mongoose = require('mongoose')
 mongoose.connect('mongodb://localhost/statisticas',{useNewUrlParser:true, useUnifiedTopology: true})
    .catch (e => {
            const msg = 'Não foi possível conectar no banco'
            console.log('\x1b[41m%s\x1b[37m',msg,'\x1b[0m')
    } )

