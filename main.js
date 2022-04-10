
/* mostra o card do pokemon digitado */
function showPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight,pokemonContentType){

    contentPokemon = document.querySelector(".contentPoke")

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


function showSixPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight,pokemonContentType){

    contentPokemon = document.querySelector(".contentPoke")

    contentPokemon.innerHTML += `
    <div class="contentPokemon cardSixPokemon">
        <h1>${pokemonContentName}</h1>
        <img src="${pokemonContentPicture}" alt="pokemon picture">
        <h2> Peso: ${pokemonContentHeight}</h2>
        <h2> Altura: ${pokemonContentWeight}</h2>
        <h2> Tipo: ${pokemonContentType}</h2>
         <button><img src="./images/pokeball-pokemon-svgrepo-com.svg" alt="" class="addButton"></button> 
    </div>
    `



}

/* faz a requisição na API do pokemon digitado */
function getPokemon(poke, situacao){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(response => {

        
        pokemonContentName = JSON.stringify(response.data.name).replace(/"/g, "")
        pokemonContentPicture = JSON.stringify(response.data.sprites.other["official-artwork"].front_default).replace(/"/g, "")
        pokemonContentHeight = JSON.stringify(response.data.height)
        pokemonContentWeight = JSON.stringify(response.data.weight)
        pokemonContentType = JSON.stringify(response.data.types[0].type.name).replace(/"/g, "")
        

        if (situacao == 1){
            showPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight,pokemonContentType)

        }else{showSixPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight,pokemonContentType)}
       

    }).catch(error => alert('Pokemon desconhecido!'))

}


/* escuta o ENTER no input e chama a função de de requisição do pokemon */
const enterSearch = document.querySelector("#inputSearch")

enterSearch.addEventListener("keydown", (element) => {
    if( element.key === "Enter") {
        let pokemonName =  (enterSearch.value).toLowerCase()
        getPokemon(pokemonName, 1)

    } 
    
})


/* dicionario english -> pt-br */
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

let contagemDe6 = 0


/* filtra na API os pokemons do tipo selecionado */
function getSixPokemon(value){

    
    const type = listTypes.find(element => element.pt === value).eng /* usa o value do button para encontrar o valor do type em inglês  */

    axios.get(`https://pokeapi.co/api/v2/type/${type}`).then(response =>{

    listPokemonsOfType = []
    

    response.data.pokemon.forEach(element =>{
        listPokemonsOfType.push(element.pokemon.name)
    }) /* Salva todos os itens em um novo array */

    listPokemonsOfTypeLength = listPokemonsOfType.length

    contagemDe6 = 0

    
    sliceSix(listPokemonsOfType, listPokemonsOfTypeLength)



    
    

    
    
})    
    
    
    }

function sliceSix(listPokemonsOfType, listPokemonsOfTypeLength){

    contentPokemon = document.querySelector(".contentPoke")
    contentPokemon.innerHTML = ""
   

        for (var i = 0; i <= 5; i++) {        
            if (contagemDe6 < listPokemonsOfTypeLength){
                getPokemon(listPokemonsOfType[contagemDe6])
                console.log(listPokemonsOfType[contagemDe6]);
                contagemDe6 += 1;
            }else{
                
                const buttonNext = document.querySelector(".nextButton")
                

                buttonNext.classList.add("hidden")  
            }
            
            
        }
       console.log(contagemDe6)

    
    
}
function sliceSixPrev(listPokemonsOfType, listPokemonsOfTypeLength){
    
    contagemDe6 -= 12
    console.log(contagemDe6)
     
    if( contagemDe6 >= 12){ 
        for (var i = 0; i <= 5; i++) {        
            if (contagemDe6 >= 0){
                console.log(listPokemonsOfType[contagemDe6]);
                contagemDe6 += 1;
                
            }  
            
            } 
        
       }else{
           contagemDe6 = 0
           console.log('aqui')
           for (var i = 0; i <= 5; i++) {        
            if (contagemDe6 >= 0){
                console.log(listPokemonsOfType[contagemDe6]);
                contagemDe6 += 1;
                
            } 
       }
    }

    
    
        if (contagemDe6 == 6) {
            const buttonPrev = document.querySelector(".prevButton")
            
            buttonPrev.classList.add("hidden")   
        }
        console.log(contagemDe6)

    }
   






function addSix(){    
    console.log(contagemDe6)
    sliceSix(listPokemonsOfType, listPokemonsOfTypeLength)

    const buttonPrev = document.querySelector(".prevButton")
            
            buttonPrev.classList.remove("hidden")
    

    }

function delSix(){    
    console.log(contagemDe6)
    sliceSixPrev(listPokemonsOfType, listPokemonsOfTypeLength)
    const buttonNext = document.querySelector(".nextButton")
                

    buttonNext.classList.remove("hidden")  
    
    }

    

    

    





