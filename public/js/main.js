const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-lock')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteKey)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteKey(){
    const aName = this.parentNode.childNodes[1].innerText
    const sCode = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteKey', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'appNameS': aName,
              'securityCodeS': sCode
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const aName = this.parentNode.childNodes[1].innerText
    const sCode = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'appNameS': aName,
              'securityCodeS': sCode,
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