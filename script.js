const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const output = document.querySelector(".output");
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

const getColorByType = (type) => {
  switch (type) {
    case "bug":
      return "#1B4C27";
      break;
    case "dark":
      return "#040706";
      break;
    case "dragon":
      return "#448B95";
      break;
    case "electric":
      return "#FFFF00";
      break;
    case "fairy":
      return "#971944";
      break;
    case "fighting":
      return "#994023";
      break;
    case "fire":
      return "#AB2021";
      break;
    case "flying":
      return "#4A677D";
      break;
    case "ghost":
      return "#33336B";
      break;
    case "grass":
      return "#127C3D";
      break;
    case "ground":
      return "#A9702C";
      break;
    case "ice":
      return "#86D2F5";
      break;
    case "poison":
      return "#5E2D88";
      break;
    case "psychic":
      return "#A12C6C";
      break;
    case "rock":
      return "#48180B";
      break;
    case "steel":
      return "#5F756D";
      break;
    case "water":
      return "#1552E2";
      break;
    default:
      return "#75515B";
  }
};

async function getPokemon(e) {
  e.preventDefault();
  const pokemonName = searchInput.value.toLowerCase();

  if (!pokemonName) {
    alert("Please enter a pokemon name");
  }

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

    if (pokemon.name === "koffing") {
      const audio = new Audio("koffing/koffing.mp3");

      audio.play();
    }

    output.style.display = "flex";
    pokeName.textContent = `Name: ${pokemon.name
      .slice(0, 1)
      .toUpperCase()}${pokemon.name.slice(1)}`;
    id.textContent = `ID: ${pokemon.id}`;
    ability.textContent = `Ability: ${pokemon.ability
      .slice(0, 1)
      .toUpperCase()}${pokemon.ability.slice(1)}`;
    weight.textContent = pokemon.weight;
    height.textContent = pokemon.height;
    pokemonSprite.src = pokemon.sprite;
    types.textContent = `${pokemon.types[0].type.name.toUpperCase()}`;
    types.style.backgroundColor = getColorByType(pokemon.types[0].type.name);
    types.style.color = "#39FF14";
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
