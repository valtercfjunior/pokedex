function getPokemon(poke){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(response => {

        const content = document.getElementById('teste')
        content.textContent = JSON.stringify(response.data.name)
        console.log(response)
    })

}

$('#inputSearch').on('keydown', function (event) {
    alert(event.value)
})
function showPokemon(element){
    
   
    
    
    /* getPokemon(namePoke) */
}

/* getPokemon()  */







    


