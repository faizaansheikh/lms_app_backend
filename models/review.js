// const pool = require("./connection");

const pool = require("../connection");
const { getTotalRec, getPaginatedData } = require("./utils");
const ReviewModel = {

    create: async ({ name, review, course_id, rating }) => {
        const query = `
      INSERT INTO reviews (name, review, course_id, rating)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
        const values = [name, review, course_id, rating];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    update: async (data) => {
        
        const { _id, name, review, course_id, rating } = data;

        const query = `
    UPDATE reviews
    SET
    name     = COALESCE($1, name),      
    review    = COALESCE($2, review),            
    course_id    = COALESCE($3, course_id),        
    rating    = COALESCE($4, rating)         
    WHERE _id = $5                                      
    RETURNING *;
  `;

        const values = [name, review, course_id, rating, _id];

        const { rows } = await pool.query(query, values);
        return rows[0];
    },


    findById: async (id) => {
        const { rows } = await pool.query(
            "SELECT * FROM reviews WHERE _id = $1",
            [id]
        );
        return rows[0];
    },

    deleteById: async (id) => {
        const { rows } = await pool.query(
            "DELETE FROM reviews WHERE _id = $1 RETURNING *;",
            [id]
        );
        return rows[0];
    },

    findAll: async ({ page, size }) => {

        const reqPage = page || 1;
        const limit = size || 10;

        const offset = (reqPage - 1) * limit;

        const totalRec = await pool.query(
            getTotalRec('reviews')
        );

        const query = getPaginatedData('reviews')
        const values = [limit, offset];
        const { rows } = await pool.query(query, values);
        return { data: rows, totalRecords: totalRec?.rows[0].count || null };
    },
    findFilterRecords: async ({ col, row }) => {
        let query;
        let values;

        if (col === "_id" || col === "course_id" || col === "rating") {
            query = `
    SELECT *
    FROM reviews
    WHERE ${col} = $1
  `;
            values = [Number(row)];
        } else {
            query = `
    SELECT *
    FROM reviews
    WHERE ${col} ILIKE $1
  `;
            values = [`%${row}%`];
        }

        const { rows } = await pool.query(query, values);
        return rows;
    },

};

module.exports = ReviewModel;
