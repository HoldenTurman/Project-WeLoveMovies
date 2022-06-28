const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//Table for Theaters in a Variable
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

//Knex table list of Theaters
function list() {
  return knex("theaters")
    .join("movies_theaters as mt", "mt.theater_id", "theaters.theater_id")
    .join("movies", "movies.movie_id", "mt.movie_id")
    .then(reduceMovies);
}

//Getting Theaters by id
function listTheatersByMovieId(movieId) {
  return knex("theaters")
    .join("movie_theaters", "theaters.theater_id", "movie_theaters.theater_id")
    .select("theaters.*", "is_showing", "movie_id")
    .where({ movie_id: movieId });
}

module.exports = {
  list,
  listTheatersByMovieId,
};