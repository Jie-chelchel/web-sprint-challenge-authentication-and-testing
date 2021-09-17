const db = require("../../data/dbConfig");

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where("id", id);
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}
module.exports = {
  add,
  find,
  findById,
};
