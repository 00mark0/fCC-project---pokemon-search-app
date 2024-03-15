const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const id = document.getElementById("pokemon-id");
const ability = document.getElementById("ability");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokemonSprite = document.getElementById("pokemon-sprite");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

async function getPokemon(e) {
  e.preventDefault();
  const pokemonName = searchInput.value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  try {
    const response = await fetch(url);
    if (response.status === 404) {
      throw new Error("Pokemon not found");
    }
    const data = await response.json();
    console.log(data);

    const pokemon = {
      name: data.name,
      id: data.id,
      ability: data.abilities[0].ability.name,
      weight: data.weight,
      height: data.height,
      sprite: data.sprites.front_default,
      types: data.types,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    };

    pokeName.textContent = `Name: ${pokemon.name
      .slice(0, 1)
      .toUpperCase()}${pokemon.name.slice(1)}`;
    id.textContent = `ID: ${pokemon.id}`;
    ability.textContent = `Ability: ${pokemon.ability}`;
    weight.textContent = pokemon.weight;
    height.textContent = pokemon.height;
    pokemonSprite.src = pokemon.sprite;
    types.textContent = `${pokemon.types[0].type.name.toUpperCase()}`;
    hp.textContent = pokemon.hp;
    attack.textContent = pokemon.attack;
    defense.textContent = pokemon.defense;
    specialAttack.textContent = pokemon.specialAttack;
    specialDefense.textContent = pokemon.specialDefense;
    speed.textContent = pokemon.speed;
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

searchBtn.addEventListener("click", getPokemon);
