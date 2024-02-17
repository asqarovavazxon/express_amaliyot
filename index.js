const express = require('express')
const mainrouter = require('./router/main')


const app = express()
//body parse qilsh 
app.use(express.json())
app.use(express.urlencoded({extended : false}))
// mainrouterni ishga tushirish 
app.use('/book', mainrouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server runing on port: ', PORT)
})