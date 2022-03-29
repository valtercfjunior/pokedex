

function showPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight,pokemonContentType){

    contentPokemon = document.querySelector("main")

    contentPokemon.innerHTML = `
    <div class="contentPokemon">
        <h1>${pokemonContentName}</h1>
        <img src="${pokemonContentPicture}" alt="pokemon picture">
        <h2> Peso: ${pokemonContentHeight}</h2>
        <h2> Altura: ${pokemonContentWeight}</h2>
        <h2> Tipo: ${pokemonContentType}</h2>
        <button><img src="./images/pokeball-pokemon-svgrepo-com.svg" alt="" class="addButton"></button>
    </div>
    `

}


function getPokemon(poke){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(response => {

        
        pokemonContentName = JSON.stringify(response.data.name).replace(/"/g, "")
        pokemonContentPicture = JSON.stringify(response.data.sprites.other["official-artwork"].front_default).replace(/"/g, "")
        pokemonContentHeight = JSON.stringify(response.data.height)
        pokemonContentWeight = JSON.stringify(response.data.weight)
        pokemonContentType = JSON.stringify(response.data.types[0].type.name).replace(/"/g, "")
        


        showPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight,pokemonContentType)

    }).catch(error => {console.log(error)})

}
const enterSearch = document.querySelector("#inputSearch")

enterSearch.addEventListener("keydown", (element) => {
    if( element.key === "Enter") {
        let pokemonName =  (enterSearch.value).toLowerCase()
        getPokemon(pokemonName)

    } 
    
})

const listTypes = [
    {pt: "Aço", eng: "steel"},
    {pt: "Água", eng: "water"},
    {pt: "Dragão", eng: "dragon"},
    {pt: "Elétrico", eng: "electric"},
    {pt: "Fada", eng: "fairy"},
    {pt: "Fantasma", eng: "ghost"},
    {pt: "Fogo", eng: "fire"},
    {pt: "Gelo", eng: "ice"},
    {pt: "Inseto", eng: "bug"},
    {pt: "Lutador", eng: "fighting"},
    {pt: "Normal", eng: "normal"},
    {pt: "Pedra", eng: "rock"},
    {pt: "Planta", eng: "grass"},
    {pt: "Psíquico", eng: "psychic"},
    {pt: "Sombrio", eng: "dark"},
    {pt: "Terrestre", eng: "ground"},
    {pt: "Venenoso", eng: "poison"},
    {pt: "Voador", eng: "flying"},
]

function showSixPokemon(value){

    
    const type = listTypes.find(element => element.pt === value).eng

    axios.get(`https://pokeapi.co/api/v2/type/${type}`).then(response =>{

    let listPokemonsOfType = []

    response.data.pokemon.forEach(element =>{
        listPokemonsOfType.push(element.pokemon.name)
    })

    console.log(listPokemonsOfType)
})

    
    
    
    }

    

    

    





