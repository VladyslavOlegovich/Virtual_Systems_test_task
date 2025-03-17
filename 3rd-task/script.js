document.addEventListener("DOMContentLoaded", function () {
  const pokemonCards = document.getElementById("pokemonCards");
  const refreshBtn = document.getElementById("refreshBtn");

  
  const getRandomIds = (max, count) => {
    const ids = new Set();
    while (ids.size < count) {
      const randomId = Math.floor(Math.random() * max) + 1;
      ids.add(randomId);
    }
    return Array.from(ids);
  };

  
  const fetchPokemons = async () => {
    try {
      pokemonCards.innerHTML = "<p>Loading...</p>";

      const totalPokemons = 120; 

      const randomIds = getRandomIds(totalPokemons, 12);

      const pokemonPromises = randomIds.map(async (id) => {
        const pokeResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        return await pokeResponse.json();
      });

      const pokemons = await Promise.all(pokemonPromises);

      pokemonCards.innerHTML = "";

      pokemons.forEach((pokemon) => {
        const card = document.createElement("div");
        card.classList.add("pokemon-card");

        const types = pokemon.types
          .map((typeInfo) => typeInfo.type.name)
          .join(", ");

        const imageUrl = pokemon.sprites.front_default;

        card.innerHTML = `
            <img src="${imageUrl}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <p><strong>Type:</strong> ${types}</p>
          `;

        pokemonCards.appendChild(card);
      });
    } catch (error) {
      pokemonCards.innerHTML =
        "<p>Error loading Pokémon. Please try again.</p>";
      console.error("Error fetching Pokémon:", error);
    }
  };

  fetchPokemons();

  // Обробка кліку на кнопку "Refresh List"
  refreshBtn.addEventListener("click", fetchPokemons);
});
