const express = require('express')
const feedRouter = require('./routes/feed')

const app = express()

app.use('/feeds',feedRouter)

app.listen(8080,()=>{
  console.log('listening on port 8080')
})