// document.addEventListener("DOMContentLoaded", function () {
//   const userCards = document.getElementById("userCards");
//   const refreshBtn = document.getElementById("refreshBtn");

//   // Функція для завантаження та відображення даних користувачів
//   const fetchUsers = async () => {
//     try {
//       userCards.innerHTML = "<p>Loading...</p>"; // Показуємо завантаження
//       const response = await fetch(
//         // "https://jsonplaceholder.typicode.com/users"
//         "https://randomuser.me/api/?results=12"
//       );
//       const users = await response.json();
//       console.log(users);
//       // Очищаємо контейнер перед оновленням
//       userCards.innerHTML = "";

//       // Створюємо картки для кожного користувача
//       users.results.forEach((user) => {
//         const card = document.createElement("div");
//         card.classList.add("user-card");

//         // Оскільки API не повертає фото, використовуємо placeholder
//         const placeholderImage = `https://via.placeholder.com/100?text=${encodeURIComponent(
//           user.name
//         )}`;

//         card.innerHTML = `
//             <img src="${placeholderImage}" alt="${user.name}">
//             <h3>${user.name}</h3>
//             <p><strong>Email:</strong> ${user.email}</p>
//           `;

//         userCards.appendChild(card);
//       });
//     } catch (error) {
//       userCards.innerHTML = "<p>Error loading users. Please try again.</p>";
//       console.error("Error fetching users:", error);
//     }
//   };

//   // Ініціалізація при завантаженні сторінки
//   fetchUsers();

//   // Обробка кліку на кнопку "Refresh List"
//   refreshBtn.addEventListener("click", fetchUsers);
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const pokemonCards = document.getElementById("pokemonCards");
//   const refreshBtn = document.getElementById("refreshBtn");

//   // Функція для завантаження та відображення даних покемонів
//   const fetchPokemons = async () => {
//     try {
//       // Показуємо завантаження
//       pokemonCards.innerHTML = "<p>Loading...</p>";

//       // Перший запит: отримуємо список покемонів (обмежимо до 12 для прикладу)
//       const response = await fetch(
//         "https://pokeapi.co/api/v2/pokemon?limit=12"
//       );
//       const data = await response.json();

//       // Очищаємо контейнер перед оновленням
//       pokemonCards.innerHTML = "";

//       // Для кожного покемона робимо додатковий запит, щоб отримати деталі
//       const pokemonPromises = data.results.map(async (pokemon) => {
//         const pokeResponse = await fetch(pokemon.url);
//         return await pokeResponse.json();
//       });

//       // Чекаємо, поки всі запити завершаться
//       const pokemons = await Promise.all(pokemonPromises);

//       // Створюємо картки для кожного покемона
//       pokemons.forEach((pokemon) => {
//         const card = document.createElement("div");
//         card.classList.add("pokemon-card");

//         // Отримуємо типи покемона (може бути кілька)
//         const types = pokemon.types
//           .map((typeInfo) => typeInfo.type.name)
//           .join(", ");

//         // Використовуємо sprite (зображення покемона)
//         const imageUrl = pokemon.sprites.front_default;

//         card.innerHTML = `
//             <img src="${imageUrl}" alt="${pokemon.name}">
//             <h3>${pokemon.name}</h3>
//             <p><strong>Type:</strong> ${types}</p>
//           `;

//         pokemonCards.appendChild(card);
//       });
//     } catch (error) {
//       pokemonCards.innerHTML =
//         "<p>Error loading Pokémon. Please try again.</p>";
//       console.error("Error fetching Pokémon:", error);
//     }
//   };

//   // Ініціалізація при завантаженні сторінки
//   fetchPokemons();

//   // Обробка кліку на кнопку "Refresh List"
//   refreshBtn.addEventListener("click", fetchPokemons);
// });

document.addEventListener("DOMContentLoaded", function () {
  const pokemonCards = document.getElementById("pokemonCards");
  const refreshBtn = document.getElementById("refreshBtn");

  // Функція для генерації випадкових унікальних ID
  const getRandomIds = (max, count) => {
    const ids = new Set();
    while (ids.size < count) {
      const randomId = Math.floor(Math.random() * max) + 1; // Генеруємо ID від 1 до max
      ids.add(randomId);
    }
    return Array.from(ids);
  };

  // Функція для завантаження та відображення даних покемонів
  const fetchPokemons = async () => {
    try {
      // Показуємо завантаження
      pokemonCards.innerHTML = "<p>Loading...</p>";

      const totalPokemons = 120; // Загальна кількість покемонів

      // Генеруємо 12 випадкових унікальних ID
      const randomIds = getRandomIds(totalPokemons, 12);

      // Для кожного ID робимо запит, щоб отримати деталі покемона
      const pokemonPromises = randomIds.map(async (id) => {
        const pokeResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        return await pokeResponse.json();
      });

      // Чекаємо, поки всі запити завершаться
      const pokemons = await Promise.all(pokemonPromises);

      // Очищаємо контейнер перед оновленням
      pokemonCards.innerHTML = "";

      // Створюємо картки для кожного покемона
      pokemons.forEach((pokemon) => {
        const card = document.createElement("div");
        card.classList.add("pokemon-card");

        // Отримуємо типи покемона
        const types = pokemon.types
          .map((typeInfo) => typeInfo.type.name)
          .join(", ");

        // Використовуємо sprite (зображення покемона)
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

  // Ініціалізація при завантаженні сторінки
  fetchPokemons();

  // Обробка кліку на кнопку "Refresh List"
  refreshBtn.addEventListener("click", fetchPokemons);
});
