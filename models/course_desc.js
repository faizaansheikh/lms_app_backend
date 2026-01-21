// const pool = require("./connection");

const pool = require("../connection");
const { getTotalRec, getPaginatedData } = require("./utils");
const Course_Desc_Model = {

    create: async ({
        course_id,
        description
    }) => {

        const query = `
      INSERT INTO events ( 
                course_id,
                description
                )
      VALUES ($1, $2)
      RETURNING _id, course_id
    `;

        const values = [
            course_id,
            description
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
    findFilterRecords: async ({ col, row }) => {
        let query;
        let values;

        if (col === "_id" || col === "course_id") {
            query = `
    SELECT *
    FROM events
    WHERE ${col} = $1
  `;
            values = [Number(row)];
        } else {
            query = `
    SELECT *
    FROM events
    WHERE ${col} ILIKE $1
  `;
            values = [`%${row}%`];
        }

        const { rows } = await pool.query(query, values);
        return rows;

    },
    update: async (data) => {

        const { _id, course_id, description } = data;

        const query = `
    UPDATE events
    SET
      course_id       = COALESCE($1, course_id),
      description = $2
    WHERE _id = $3
    RETURNING  _id, course_id
  `;

        const values = [
            course_id, description, _id
        ];

        const { rows } = await pool.query(query, values);
        console.log("Updated row test:", rows[0]);
        return rows[0];
    },


    findById: async (id) => {
        const { rows } = await pool.query(
            "SELECT * FROM events WHERE _id = $1",
            [id]
        );
        return rows[0];
    },
    findCourseById: async (id) => {
        const { rows } = await pool.query(
            "SELECT * FROM events WHERE course_id = $1",
            [id]
        );
        return rows[0];
    },
    deleteById: async (id) => {
        const { rows } = await pool.query(
            "DELETE FROM events WHERE _id = $1 RETURNING *;",
            [id]
        );
        return rows[0];
    },

    findAll: async ({ page, size }) => {
        if (page && size) {
            const reqPage = page || 1;
            const limit = size || 10;

            const offset = (reqPage - 1) * limit;

            const totalRec = await pool.query(
                getTotalRec('events')
            );

            const query = getPaginatedData('events')
            const values = [limit, offset];
            const { rows } = await pool.query(query, values);
            return { data: rows, totalRecords: totalRec?.rows[0].count || null };
        } else {
            const { rows } = await pool.query('SELECT * FROM events');
            return rows
        }


    },







};

module.exports = Course_Desc_Model;
