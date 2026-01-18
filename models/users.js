// const pool = require("./connection");

const pool = require("../connection");
const { getPaginatedData, getTotalRec } = require("./utils");

const UserModel = {

  create: async ({ name, email, password, role }) => {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING _id, name, email, role
    `;
    const values = [name, email, password, role || "student"];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
  update: async (data) => {
    const { _id, name, email, password, role } = data;

    const query = `
    UPDATE users
SET
    name     = COALESCE($1, name),      
    email    = COALESCE($2, email),
    password = COALESCE($3, password), 
    role     = COALESCE($4, role)              
WHERE _id = $5                                      
RETURNING _id, name, email, role;
  `;

    const values = [name, email, password, role, _id];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },


  findByEmail: async (email) => {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return rows[0];
  },

  findById: async (id) => {
    const { rows } = await pool.query(
      "SELECT _id, name, email, password, role FROM users WHERE _id = $1",
      [id]
    );
    return rows[0];
  },

  deleteById: async (id) => {
    const { rows } = await pool.query(
      "DELETE FROM users WHERE _id = $1 RETURNING *;",
      [id]
    );
    return rows[0];
  },

  findAll: async ({ page, size }) => {

    const reqPage = page || 1;
    const limit = size || 10;

    const offset = (reqPage - 1) * limit;

    const totalRec = await pool.query(
      getTotalRec('users')
    );

    const query = getPaginatedData('users')
    const values = [limit, offset];
    const { rows } = await pool.query(query, values);
    return { data: rows, totalRecords: totalRec?.rows[0].count || null };
  },

  findFilterRecords: async ({ col, row }) => {
    const allowedColumns = ['name', 'email', 'role'];

    if (!allowedColumns.includes(col)) {
      throw new Error('Invalid column name');
    }

    const query = `
    SELECT *
    FROM users
    WHERE ${col} ILIKE $1
  `;

    const { rows } = await pool.query(query, [`%${row}%`]);

    return rows;
  },

};

module.exports = UserModel;
