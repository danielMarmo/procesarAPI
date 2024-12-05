fetch("https://api.rawg.io/api/games?key=236c519bed714a588c3f1aee662a2c2d")
    .then(response => response.json())
    .then(data => {
        procesardatos(data.results);
    })
    .catch(error => console.error("Error:", error));

function procesardatos(data) {
  data.forEach(game => {
    console.log("Nombre del juego:", game.name);
    console.log("Fecha de lanzamiento:", game.released);
    console.log("Imagen de fondo:", game.background_image);
    game.platforms.forEach(platform => {
      console.log("Plataforma:", platform.platform.name);
    });
    game.ratings.forEach(rating => {
      console.log("Calificación:", rating.title, "-", rating.percent + "%");
    });
    let genres = [];
    game.genres.forEach(genre => {
      genres.push(genre.name);
    });
    console.log("Géneros:", genres.join(", "));
    console.log("Metacritic:", game.metacritic);
    console.log("Tiempo de juego:", game.playtime, "horas");
    console.log("Calificación promedio:", game.rating);
    console.log("Número de reseñas:", game.reviews_count);
    console.log("Número de sugerencias:", game.suggestions_count);
    console.log("Slug del juego:", game.slug);
  });
}
