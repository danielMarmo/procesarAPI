import { plataformaicono } from './plataformaicono.js';

/*******************************************************************************/
// Cards de juegos
let page = 1;

function getGames(page = 1, pageSize = 40) {
    const url = `https://api.rawg.io/api/games?key=236c519bed714a588c3f1aee662a2c2d&page=${page}&page_size=${pageSize}`;
    fetch(url)
        .then(response => response.json())
        .then(jsondata => procesarGames(jsondata))
        .catch(error => console.error("Error", error));
}

function procesarGames(jsondata) {
    let plantilla = document.getElementById("plantilla");
    let contenedor = plantilla.parentNode;
    contenedor.removeChild(plantilla);

    contenedor.innerHTML = "";

    jsondata.results.forEach(game => {
        let tarjeta = plantilla.cloneNode(true);
        contenedor.appendChild(tarjeta);

        // Asignar imagen del juego
        let imagen = tarjeta.querySelector("#game_background_image");
        imagen.setAttribute("src", game.background_image);
        imagen.setAttribute("alt", game.name);

        // Asignar plataformas (íconos)
        const plataformas = tarjeta.querySelector("#game_platforms");
        plataformas.innerHTML = "";

        const uniqueIcons = new Set();

        game.platforms.forEach(plataforma => {
            const platformName = plataforma.platform.name;
            const iconSrc = plataformaicono[platformName];

            if (iconSrc && !uniqueIcons.has(iconSrc)) {
                uniqueIcons.add(iconSrc);

                const icono = document.createElement("li"); // Crear un <li> para cada ícono
                const img = document.createElement("img");
                img.src = iconSrc;
                img.alt = platformName;
                img.style.width = "24px"; // Ajustar tamaño
                img.style.marginRight = "8px";
                icono.appendChild(img);

                plataformas.appendChild(icono);
            }
        });

        // Asignar nombre del juego
        let nombre = tarjeta.querySelector("#game_name");
        nombre.textContent = game.name;

        // Asignar géneros
        const contenedorGeneros = tarjeta.querySelector("#game_genres");
        contenedorGeneros.innerHTML = ""; // Limpiar contenido previo

        game.genres.forEach(genero => {
            const genreElement = document.createElement("li"); // Crear un <li> para cada género
            genreElement.textContent = genero.name;
            contenedorGeneros.appendChild(genreElement);
        });

        // Asignar fecha de lanzamiento
        let released = tarjeta.querySelector("#game_released");
        released.textContent = "Fecha de salida: " + game.released;

        // Asignar un ID único a la tarjeta
        tarjeta.setAttribute("id", "game_" + game.id);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    getGames(page, 40);

    // Manejo del botón "siguiente"
    document.querySelector('#paginasiguiente').addEventListener('click', function (event) {
        event.preventDefault();
        page += 1;
        getGames(page, 40); // Recargamos los juegos sin filtros
    });

    // Manejo del botón "anterior"
    document.querySelector('#paginaanterior').addEventListener('click', function (event) {
        event.preventDefault();
        if (page > 1) {
            page -= 1;
        }
        getGames(page, 40); // Recargamos los juegos sin filtros
    });

    // Limpiar filtros
    document.querySelector(".limpiarFiltros").addEventListener("click", limpiarFiltros);
});

/*******************************************************************************/
// Cards de plataformas

fetch("https://api.rawg.io/api/platforms?key=236c519bed714a588c3f1aee662a2c2d")
    .then(response => response.json())
    .then(jsondata => procesarPlataformas(jsondata))
    .catch(error => console.error("Error:", error));

function procesarPlataformas(jsondata) {
    let plantilla = document.getElementById("plantilla");
    let contenedor = plantilla.parentNode;
    contenedor.removeChild(plantilla);

    jsondata.results.forEach(platform => {
        let tarjeta = plantilla.cloneNode(true);
        tarjeta.style.display = "";
        contenedor.appendChild(tarjeta);

        let imagen = tarjeta.querySelector("#platform_background_image");
        imagen.setAttribute("src", platform.image_background);
        imagen.setAttribute("alt", platform.name);

        let nombre = tarjeta.querySelector("#platform_name");
        nombre.textContent = platform.name;

        let juegosCount = tarjeta.querySelector("#platform_games_count");
        juegosCount.textContent = "Cantidad de juegos: " + platform.games_count;

        tarjeta.setAttribute("id", "platform_" + platform.id);
    });
}

/*******************************************************************************/
// Cards de generos

fetch("https://api.rawg.io/api/genres?key=236c519bed714a588c3f1aee662a2c2d")
    .then(response => response.json())
    .then(jsondata => procesarGeneros(jsondata))
    .catch(error => console.error("Error:", error));

function procesarGeneros(jsondata) {
    let plantilla = document.getElementById("plantilla");
    let contenedor = plantilla.parentNode;
    contenedor.removeChild(plantilla);

    jsondata.results.forEach(genre => {
        let tarjeta = plantilla.cloneNode(true);
        tarjeta.style.display = "";
        contenedor.appendChild(tarjeta);

        let imagen = tarjeta.querySelector("#genre_background_image");
        imagen.setAttribute("src", genre.image_background);
        imagen.setAttribute("alt", genre.name);

        let nombre = tarjeta.querySelector("#genre_name");
        nombre.textContent = genre.name;

        let juegosCount = tarjeta.querySelector("#genre_games_count");
        juegosCount.textContent = "Cantidad de juegos: " + genre.games_count;

        tarjeta.setAttribute("id", "genre_" + genre.id);
    });
}

/*******************************************************************************/