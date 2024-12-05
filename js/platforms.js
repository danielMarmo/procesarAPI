fetch("https://api.rawg.io/api/platforms?key=236c519bed714a588c3f1aee662a2c2d")
  .then(response => response.json())
  .then(jsondata => procesarJSON(jsondata))
  .catch(error => console.error("Error:", error));

function procesarJSON(jsondata) {
  let plantilla = document.getElementById("plantilla");
  let contenedor = plantilla.parentNode;
  contenedor.removeChild(plantilla);

  jsondata.results.forEach(platform => {
    let tarjeta = plantilla.cloneNode(true);
    tarjeta.style.display = ""; 
    contenedor.appendChild(tarjeta);

    let imagen = tarjeta.querySelector("#background_image");
    imagen.setAttribute("src", platform.image_background);
    imagen.setAttribute("alt", platform.name);

    let nombre = tarjeta.querySelector("#name");
    nombre.textContent = platform.name;

    let juegosCount = tarjeta.querySelector("#games_count");
    juegosCount.textContent = "Cantidad de juegos: " + platform.games_count;

    tarjeta.setAttribute("id", "platform_" + platform.id);
  });

  console.log("Contenido final del contenedor:");
  console.log(contenedor.outerHTML);
}