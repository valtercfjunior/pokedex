

function showPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentType){

    contentPokemon = document.querySelector("main")

    contentPokemon.innerHTML = `
    <div class="contentPokemon">
        <h1>${pokemonContentName}</h1>
        <img src="${pokemonContentPicture}" alt="pokemon picture">
        <h2> Peso: ${pokemonContentHeight}</h2>
        <h2> Tipo: ${pokemonContentType}</h2>
    </div>
    `

}


function getPokemon(poke){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(response => {

        
        pokemonContentName = JSON.stringify(response.data.name).replace(/"/g, "")
        pokemonContentPicture = JSON.stringify(response.data.sprites.other["official-artwork"].front_default).replace(/"/g, "")
        pokemonContentHeight = JSON.stringify(response.data.height)
        pokemonContentType = JSON.stringify(response.data.types[0].type.name).replace(/"/g, "")
        


        showPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentType)

    }).catch(error => {console.log(error)})

}
const enterSearch = document.querySelector("#inputSearch")

enterSearch.addEventListener("keydown", (element) => {
    if( element.key === "Enter") {
        let pokemonName =  (enterSearch.value).toLowerCase()
        getPokemon(pokemonName)

    } 
    
})

