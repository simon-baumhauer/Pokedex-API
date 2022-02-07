let currentPokemon;
let pokemonsCards = ['charmander', 'pikachu'];
let PokemonCollections = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'pikachu']
let PokemonAsJson = [];


async function loadPokemon() {
    for (let i = 0; i < PokemonCollections.length; i++) {
        const collectible = PokemonCollections[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${collectible}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        PokemonAsJson.push(currentPokemon);
        console.log(currentPokemon);
        renderPokemonInfo(i);
    }
    renderPokemonCard();
}

function renderPokemonCard() {
    document.getElementById('pokemonName').innerHTML = PokemonAsJson[9]['name'];
    document.getElementById('pokemonImage').src = PokemonAsJson[9]['sprites']['other']['home']['front_default'];
    let statslength = PokemonAsJson[0]['stats'].length;
    for (let j = 0; j < statslength; j++) {
        document.getElementById(`stat-` + j).innerHTML = `
        <div class="stats-container">
        <div class="flexcontainer">
        <span>${PokemonAsJson[9]['stats'][j]['stat']['name']}</span>
        <span class="bold">${PokemonAsJson[9]['stats'][j]['base_stat']}</span>
        </div>
        <div id="skill-bar${j}" class="skill-bar" data-label="" style="--width: ${PokemonAsJson[9]['stats'][j]['base_stat']}"><div class="inside-bar green" id="test"></div></div>
        </div>`;
    }
}

function renderPokemonInfo(i) {
    document.getElementById('PokemonCollections').innerHTML +=
        `<div class="collectible color-${i}" onclick='select(${i})'>
        <h3>${currentPokemon['name']}</h3>
        <img id="PokemonCollectionsImg-${i}" class="CollectionImg">
    </div>`;
    document.getElementById('PokemonCollectionsImg-' + i).src = currentPokemon['sprites']['other']['home']['front_default'];
}

function select(i) {
    let statslength = PokemonAsJson[i]['stats'].length;
    document.getElementById('pokemonName').innerHTML = PokemonAsJson[i]['name'];
    document.getElementById('pokemonImage').src = PokemonAsJson[i]['sprites']['other']['home']['front_default'];
    removeColors();
    document.getElementById(`pokedex1`).classList.add(`color-${i}`);
    for (let j = 0; j < statslength; j++) {
        document.getElementById(`stat-` + j).innerHTML = `
        <div class="stats-container">
        <div class="flexcontainer">
        <span>${PokemonAsJson[i]['stats'][j]['stat']['name']}</span>
        <span class="bold" id="skill-number">${PokemonAsJson[i]['stats'][j]['base_stat']}</span>
        </div>
        <div class="skill-bar" data-label="" style="--width: ${PokemonAsJson[i]['stats'][j]['base_stat']}"><div class="inside-bar green"></div></div>
        </div>
        `;
    }
}

function removeColors() {
    for (let i = 0; i < PokemonCollections.length; i++) {
        const element = PokemonCollections[i];
        document.getElementById(`pokedex1`).classList.remove(`color-${i}`);
    }
}