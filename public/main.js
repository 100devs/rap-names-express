const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deletePlanet)
})

async function deletePlanet(){
    const planetName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deletePlanet', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'planetNameS': planetName,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
