fetch("https://api.rawg.io/api/platforms?key=236c519bed714a588c3f1aee662a2c2d")
  .then((response) => response.json())
  .then((jsondata) => procesarPlataformas(jsondata))
  .catch((error) => console.error("Error:", error));

  function procesarPlataformas(jsondata) {
    let plantilla = document.getElementById("plantilla");
    let contenedor = plantilla.parentNode;
    contenedor.removeChild(plantilla);

    let nombresPlataformas = [];
    let juegosPorPlataforma = [];

    jsondata.results.forEach((platform) => {
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

        nombresPlataformas.push(platform.name);
        juegosPorPlataforma.push(platform.games_count);
    });

    crearGrafico(nombresPlataformas, juegosPorPlataforma);
}

function crearGrafico(nombresPlataformas, juegosPorPlataforma) {
    const ctx = document.getElementById('graficoPlataformas').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombresPlataformas,
            datasets: [{
                label: 'Cantidad de juegos por plataforma',
                data: juegosPorPlataforma,
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