const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

let db,
    dbConnectionStr = 'mongodb+srv://outerspace-cc:england3@cluster1.y3pxz.mongodb.net/Cluster1?retryWrites=true&w=majority',
    dbName = 'planets'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('planets').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addPlanet', (request, response) => {
    db.collection('planets').insertOne(request.body)
    .then(result => {
        console.log('planet added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deletePlanet', (request, response) => {
    db.collection('planets').deleteOne({planetName: request.body.planetNameS})
    .then(result => {
        console.log('planet deleted')
        response.json('planet deleted')
    })
    .catch(error => console.error(error))

})

// process.env.PORT ||
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
