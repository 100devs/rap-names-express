// Storing the Thumbs up and Delete items in variables
const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

// Setting an event listener to run the "deleteRapper" function on each one of our existing rappers list items
// We do not know how many we are going to have which is why it has to be dynamically placing the event listeners (we couldn't hard code it even if we wanted)
Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRapper)
})

// Set up event listener on all of our Thumbs Up elements from our existing "li" list
// The event listener we place on those buttons helps run the "addLike" function once it has been clicked
Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

// Creating our deleteRapper function using the special async/await syntax
// This is just syntactic sugar for using asynchronous Javascript code (instead of using callbacks)
async function deleteRapper(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try{
        // Make a request to our server's API that will know how to respond to the delete request
        const response = await fetch('deleteRapper', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageNameS': sName,
              'birthNameS': bName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

// Creating our addLike funcitonality that will make an API request to our own server
// The server will know how to respond to the request and will return back data in the form of a response
// After the response, we refresh the page and make a GET request thus re-rendering the updated version of our HTML page (using EJS)
async function addLike(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        // Make a PUT request to the server API "addOneLike"
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageNameS': sName,
              'birthNameS': bName,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}