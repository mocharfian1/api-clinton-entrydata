const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
app.use(express.json())

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Hello World!')
})

require('./app/routes')(app, cors());



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
