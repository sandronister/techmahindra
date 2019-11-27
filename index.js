require('dotenv/config')
const app = require('./server'),
    port = process.env.SRV_PORT || 5000

app.listen(port, _ => {
    console.log('Rodando na porta %d', port)
})
