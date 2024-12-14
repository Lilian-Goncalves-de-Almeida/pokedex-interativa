const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const MoreInfoPokeCard = document.querySelector(".container-pokemon");

const pokemonSelectImage = document.getElementById('pokemon-select-image')
const pokemonSelectTittle = document.getElementById('name-poke-card')
const pokemonSelectType = document.getElementById('type-poke-card')
const pokemonSelectMoves = document.getElementById('moves-poke-card')
const typesList = [
    "normal" ,"grass" ,"fire" ,"water" ,"electric", "ice", "ground", "flying", "poison", "fighting", "psychic", "dark", "rock", "bug", "ghost", "steel",  "dragon", "fairy",
]

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="selectPokemon('${pokemon.photo}','${pokemon.name}','${pokemon.type}','${pokemon.attacks}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function selectPokemon(pokemonPhotoAtual, name, type, pokeAttacks){
    MoreInfoPokeCard.classList.remove("exited")
    pokemonSelectImage.src = pokemonPhotoAtual
    pokemonSelectImage.parentElement.classList.remove(...typesList)
    pokemonSelectImage.parentElement.classList.add(`${type}`)
    pokemonSelectTittle.textContent = name
    pokemonSelectType.textContent = type
    pokemonSelectType.classList.remove(...typesList)
    pokemonSelectType.classList.add(`${type}`)
    let pokemovesHTML =`<h3 class="">Moves</h3>`
    pokeAttacks = pokeAttacks.split(",")
    pokeAttacks.forEach(pokemove => {
        pokemovesHTML+=`<li class="pokemoves">${pokemove}</li>`
    });
    pokemonSelectMoves.innerHTML = pokemovesHTML
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})