
/* mostra o card do pokemon digitado */
function showPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight,pokemonContentType){

    const buttonNext = document.querySelector(".nextButton")
                

    buttonNext.classList.add("hidden")

    const buttonPrev = document.querySelector(".prevButton")
            
            buttonPrev.classList.add("hidden")
    
    let contentPokemon = document.querySelector(".contentPoke")

    contentPokemon.innerHTML = `
    <div class="contentPokemon">
        <h1>${pokemonContentName}</h1>
        <img src="${pokemonContentPicture}" alt="pokemon picture">
        <h2> Peso: ${pokemonContentHeight}</h2>
        <h2> Altura: ${pokemonContentWeight}</h2>
        <h2> Tipo: ${pokemonContentType}</h2>
        <button onclick="addInPokedex(this.value)" value="${pokemonContentName}" ><img src="./images/pokeball-pokemon-svgrepo-com.svg" alt="" class="addButton"></button>
    </div>
    `

    const inputPokemon = document.querySelector("#inputSearch")
    inputPokemon.value = ""

}





var contentPokemons =""

/* adiciona o html dos 06 pokemons */
function showSixPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight){   
    
    
    const buttonNext = document.querySelector(".nextButton")
                

    buttonNext.classList.remove("hidden")

     contentPokemons += `
    <div class="contentPokemon cardSixPokemon">
        <h1>${pokemonContentName}</h1>
        <img src="${pokemonContentPicture}" alt="pokemon picture">
        <h2> Peso: ${pokemonContentHeight}</h2>
        <h2> Altura: ${pokemonContentWeight}</h2>
        
         <button onclick="addInPokedex(this.value)" value="${pokemonContentName}" ><img src="./images/pokeball-pokemon-svgrepo-com.svg" alt="" class="addButton"  ></button> 
    </div>
  `
    
  return contentPokemons
}


/* retorna o HTML da pokedex */
function showPokedex(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight){

    
    let contentPokemon = document.querySelector(".contentPoke")
   

    contentPokemon.innerHTML += `
    <div class="contentPokemon cardSixPokemon pokedexers">
        <h1>${pokemonContentName}</h1>
        <img src="${pokemonContentPicture}" alt="pokemon picture">
        <h2> Peso: ${pokemonContentHeight}</h2>
        <h2> Altura: ${pokemonContentWeight}</h2>
        <button onclick="delPokedex(this.value)" value="${pokemonContentName}"><i class='bx bx-x-circle bx-tada' style='color:#625f5f' ></i></button>
        
         
    </div>
    `
}








/* faz a requisição na API do pokemon digitado */
function getPokemon(poke, situacao){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(response => {

        const {data} = response
        
        pokemonContentName = data.name;
        pokemonContentPicture = data.sprites.other["official-artwork"].front_default;
        pokemonContentHeight = data.height;   pokemonContentWeight = data.weight;
        pokemonContentType = data.types[0].type.name;
        

        if (situacao == 1){
            showPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight,pokemonContentType)

        }else if(situacao == 2){            
            let listOfSix = showSixPokemon(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight,pokemonContentType)

            contentPokemon = document.querySelector(".contentPoke")


            contentPokemon.innerHTML = listOfSix
            
            

        }else{
            showPokedex(pokemonContentName, pokemonContentPicture, pokemonContentHeight,pokemonContentWeight,pokemonContentType)
        }

       

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
    contentPokemons =""

    
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





/* limpa o filtro dos 06 pokemons */
function clearFilters(){

    let contentPokemon = document.querySelector(".contentPoke")
    contentPokemon.innerHTML = "<h1 >Digite o nome de um Pokemon depois Enter <i class='bx bxs-keyboard' style='color:#1f1f3ac4; font-size: 30px;'  ></i> ou clique nos filtros.</h1>"
    
}





/* seleciona os proximos 06 pokemons da lista */
function sliceSix(listPokemonsOfType, listPokemonsOfTypeLength){

    let contentPokemon = document.querySelector(".contentPoke")
    contentPokemon.innerHTML = ""
   

        for (var i = 0; i <= 5; i++) {        
            if (contagemDe6 < listPokemonsOfTypeLength){
                getPokemon(listPokemonsOfType[contagemDe6],2)
                
                contagemDe6 += 1;
            }else{
                
                const buttonNext = document.querySelector(".nextButton")
                

                buttonNext.classList.add("hidden")  
            }
            
            
        }
          
}





/* seleciona os 06 pokemons anteriores da lista */
function sliceSixPrev(listPokemonsOfType, listPokemonsOfTypeLength){

    let contentPokemon = document.querySelector(".contentPoke")
    contentPokemon.innerHTML = ""
    
    contagemDe6 -= 12
    console.log(contagemDe6)
     
    if( contagemDe6 >= 12){ 
        for (var i = 0; i <= 5; i++) {        
            if (contagemDe6 >= 0){
                getPokemon(listPokemonsOfType[contagemDe6],2);
                contagemDe6 += 1;
                
            }  
            
            } 
        
       }else{
           contagemDe6 = 0
           console.log('aqui')
           for (var i = 0; i <= 5; i++) {        
            if (contagemDe6 >= 0){
                getPokemon(listPokemonsOfType[contagemDe6],2);
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
   





/* botao next */
function addSix(){
    contentPokemons =""    
    
    sliceSix(listPokemonsOfType, listPokemonsOfTypeLength)

    const buttonPrev = document.querySelector(".prevButton")
            
            buttonPrev.classList.remove("hidden")
    

    }




/* botao prev */
function delSix(){  
    contentPokemons =""  
    
    sliceSixPrev(listPokemonsOfType, listPokemonsOfTypeLength)
    const buttonNext = document.querySelector(".nextButton")
                

    buttonNext.classList.remove("hidden")  
    
    }

let pokedex = JSON.parse(localStorage.getItem('pokedex'))  || []

function addInPokedex(pokemon){
    
    if (pokedex.indexOf(pokemon) < 0){
        pokedex.push(pokemon)
        localStorage.setItem('pokedex', JSON.stringify(pokedex))
    
    }
    

    alert('POKEMON CAPTURADO, ABRA SUA POKEDEX!!!') 

}


function delPokedex(pokemon){

    let contentPokemon = document.querySelector(".contentPoke")
    contentPokemon.innerHTML = ""

    const index = pokedex.indexOf(pokemon)
    
    pokedex.splice(index, 1)
    localStorage.setItem('pokedex', JSON.stringify(pokedex))
    
    getPokedex()
    
}

function getPokedex(){

    const buttonNext = document.querySelector(".nextButton")                

    buttonNext.classList.add("hidden")
    const buttonPrev = document.querySelector(".prevButton")
            
    buttonPrev.classList.add("hidden") 


    contentPokemon = document.querySelector(".contentPoke")
    contentPokemon.innerHTML = ""



    pokedex.forEach(element => getPokemon(element))

}

    

    

    





