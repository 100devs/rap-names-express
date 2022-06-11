// Setting up our express app
const express = require('express')
const app = express()
// Setting up our MongoDB database
const MongoClient = require('mongodb').MongoClient
// Setting up our listening PORT
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'rap'

// Connecting to our MongoDB client
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
})

// Setting up our middleware

// Ejs for our dynamically generated HTML
app.set('view engine', 'ejs')
// Allowing Express to serve up static files such as HTML, CSS, Client Side JS (without explicit coding)
app.use(express.static('public'))
// Allows Express to parse String and Array from incoming client requests
app.use(express.urlencoded({ extended: true }))
// Allows Express to parse JSON from incoming client requests
app.use(express.json())

// Setting up our Root GET request
app.get('/',(request, response)=>{
    // Access collection "rappers" inside of our MongoDB database
    // .find() method is a method provided by MongoDB that allows us to return the documents inside of the "rappers" collection (which are at the end of the day just a bunch of objects)
    // We sort based on likes using the .sort() method provided by MongoDB
    // With all those sorted documents from the "rappers" collection we store them in an array
    db.collection('rappers').find().sort({likes: -1}).toArray()
    .then(data => {
        // As soon as the request to MongoDB's database has finished fetching we send our response back to the client (making the request)
        // The response we send back to the client is the "index.ejs" file which holds the data we have extracted from the MongoDB collection (passing the array of documents)
        response.render('index.ejs', { info: data })
    })
    // If getting data from the MongoDB database fails, we get back a rejected promise and the .catch() handler runs
    .catch(error => console.error(error))
})

// Setting up our POST request (for dynamically adding rappers to the database)
app.post('/addRapper', (request, response) => {
    // Here we once again access the MongoDB collection of "rappers"
    // This time we use the .insertOne() MongoDB method that allow us to add a new document to our "rappers" collection
    // What we add to the "rappers" collection is based on the information the client send (in the form of the request)
    // request.body => is how we access the information that the client sent (by submitting the form in our HTML file)
    // From that (request body) we extract ONLY the stageName and birthName and initialize it to zero
    db.collection('rappers').insertOne({
        stageName: request.body.stageName,
        birthName: request.body.birthName, 
        likes: 0
    })
    .then(result => {
        // Adding a new entry into the "rappers" collection means that the function is asynchronous
        // For this reason, we use the .then() handler to log to the server.js console the successful creation and redirect to the root page (refreshing the page and loading up the new rendered HTML)
        console.log('Rapper Added')
        response.redirect('/')
    })
    // If writing to the MongoDB database fails, we get back a rejected promise and the .catch() handler runs
    .catch(error => console.error(error))
})

// Setting up our PUT request (for dynamically updating the likes count of our rappers documents)
app.put('/addOneLike', (request, response) => {
    // Accessing the MongoDB "rappers" collection and using the .updateOne() method to update the information in our database
    // The way we update the documents in our database in based on the request.body information which we get from another event listener in our client side JS
    // First object {stageName ...} is meant to help Mongo identify which items to update
    // The second object is meant to increase the likes counter by one (remember we are starting from zero likes)
    // The third object is meant to help keep our information display in an desceding order (high => low); "upsert: true" means that we create a new entry if there is none threre
    db.collection('rappers').updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        // If the update request made to MongoDB returns a fulfilled promise then we console.log to our server to account for the added like and respond back to the client with JSON information
        // By responding back to the client, we also help create the chain of events that ultimately leads to a get request at the root file which will display the HTML file with the UPDATED likes counter
        console.log('Added One Like')
        response.json('Like Added')
    })
    // If updating the database likes counter returns a rejected promise then our .catch() handler takes over
    .catch(error => console.error(error))

})

// Setting our the delete functionality on our website
// The way this is triggered is by the user clicking on the delete button with an event listener attached to it
// That event listener then triggers the function "async function deleteRapper()" which creates our delete request (to our server API)
app.delete('/deleteRapper', (request, response) => {
    // Search our MongoDB database for "rappers" collections and deletes an item based on the stageName matching the information we get from the request's body (stageNameS)
    db.collection('rappers').deleteOne({stageName: request.body.stageNameS})
    .then(result => {
        // Logs to the server that the rapper has been deleted
        console.log('Rapper Deleted')
        // Sends back a JSON response for the client to know that the request was successful
        // This then refreshes the page => triggering our GET request for the root page => ultimately rendering a new version of the HTML (with the help of EJS) effectively deleting the rapper info from the page
        response.json('Rapper Deleted')
    })
    // If deleting from the db returns a rejected promise then the .catch() handler is returned
    .catch(error => console.error(error))

})


// Setting our server port
// Use short-circuit evaluation to either use the port of the deployment environment or our localhost:2121 port
// Make sure to log to the console to let the user know when the server is running
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})