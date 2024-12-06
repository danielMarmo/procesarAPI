fetch("https://api.rawg.io/api/genres?key=236c519bed714a588c3f1aee662a2c2d")
    .then((response) => response.json())
    .then((jsondata) => procesarGeneros(jsondata))
    .catch((error) => console.error("Error:", error));

function procesarGeneros(jsondata) {
    let plantilla = document.getElementById("plantilla");
    let contenedor = plantilla.parentNode;
    contenedor.removeChild(plantilla);

    let nombresGeneros = [];
    let juegosPorGenero = [];

    jsondata.results.forEach((genre) => {
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

        nombresGeneros.push(genre.name);
        juegosPorGenero.push(genre.games_count);
    });

    crearGrafico(nombresGeneros, juegosPorGenero);
}

function crearGrafico(nombresGeneros, juegosPorGenero) {
    const ctx = document.getElementById('graficoGeneros').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombresGeneros,
            datasets: [{
                label: 'Cantidad de juegos por genero',
                data: juegosPorGenero,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}