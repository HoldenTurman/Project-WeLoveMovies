const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

//list of all reviews in knex table
function list() {
  return knex("reviews").select("*");
}

//delete table
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

//update table
function update(reviewId, updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update(updatedReview, "*");
}

function getUpdatedRecord(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then((result) => {
      const updatedRecord = addCritic(result);
      updatedRecord.critic_id = updatedRecord.critic.critic_id;
      return updatedRecord;
    });
}

//read reviews based on id
function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id: review_id})
        .first();
}

module.exports = {
    list,
    delete: destroy,
    update,
    getUpdatedRecord,
    read,
}
