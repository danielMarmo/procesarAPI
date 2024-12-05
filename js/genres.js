fetch("https://api.rawg.io/api/genres?key=236c519bed714a588c3f1aee662a2c2d")
    .then(response => response.json())
    .then(data => {
        procesardatos(data.results);
    })
    .catch(error => console.error("Error:", error));

function procesardatos(data) {
    data.forEach(genre => {
        console.log("Nombre del género:", genre.name);
        console.log("Cantidad de juegos:", genre.games_count);
        console.log("Imagen de fondo:", genre.image_background);
    });
}