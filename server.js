const express = require('express') //connect express to server
const app = express() //connect application to express server
const MongoClient = require('mongodb').MongoClient //connect MongoDB to server
const PORT = 2121 //port localhost
require('dotenv').config() //database string


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'security' //name of database

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
    db.collection('keys').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addKey', (request, response) => {
    db.collection('keys').insertOne({appName: request.body.appName,
    securityCode: request.body.securityCode, likes: 0})
    .then(result => {
        console.log('Rapper Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('keys').updateOne({appName: request.body.appNameS, securityCode: request.body.securityCodeS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteKey', (request, response) => {
    db.collection('keys').deleteOne({appName: request.body.appNameS})
    .then(result => {
        console.log('Rapper Deleted')
        response.json('Rapper Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})