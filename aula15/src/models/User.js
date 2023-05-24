const bcrypt = require('bcrypt');
const { conn } = require('../db');

async function create(data) {
  const sql = `
    INSERT INTO
      users (id, name, email, password)
    VALUES
      (?, ?, ?, ?)
  `;

  const db = await conn();

  const { id, name, email, password } = data;
  console.log('salt: ' + process.env.SALT);

  const hash = await bcrypt.hash(password, process.env.SALT);

  const { lastID } = await db.run(sql, [id, name, email, hash]);

  return lastID;
}

async function createAutoInc(data) {
  const sql = `
    INSERT INTO
      users (name, email, password)
    VALUES
      (?, ?, ?)
  `;

  const db = await conn();

  const { name, email, password } = data;

  const { lastID } = await db.run(sql, [name, email, password]);

  return lastID;
}

async function readById(id) {
  const sql = `
      SELECT
        *
      FROM
        users
      WHERE
        users.id = ?
  `;

  const db = await conn();

  const user = await db.get(sql, id);

  return user;
}

async function readByEmail(email) {
  const sql = `
    SELECT
      *
    FROM
      users
    WHERE
      users.email = ?
  `;

  const db = await conn();

  const user = await db.get(sql, email);

  return user;
}

module.exports = { create, createAutoInc, readById, readByEmail };
