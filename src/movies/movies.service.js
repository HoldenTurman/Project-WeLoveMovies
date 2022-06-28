const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});
//Knex table of all movies 
function list() {
  return knex("movies").select("*");
}

//What movies are showing
function listIsShowing() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .select("movies.*", "movies_theaters.is_showing")
    .groupBy("movies.movie_id")
    .where({ is_showing: true });
}

//movie id
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first();
}

//Finding theaters and movies
const readTheatersByMovie = movie_id => {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .where({ "mt.movie_id": movie_id });
};


//finding reviews based off critics
const readReviewsByMovie = movie_id => {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie_id })
    .then(reviews => reviews.map(review => addCritic(review)));
};

module.exports = {
  list, 
  listIsShowing,
  read,
  readTheatersByMovie,
  readReviewsByMovie,
}
