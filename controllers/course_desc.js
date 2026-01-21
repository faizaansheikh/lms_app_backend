

const cloudinary = require("cloudinary").v2
const fs = require('fs');
const Course_Desc_Model = require("../models/course_desc");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure_distribution: 'mydomain.com',
    // upload_prefix: 'https://api-eu.cloudinary.com'
});
const course_desc = {

    create: async (req, res) => {

        try {
            
            const { course_id, description } = req.body;

            const table = await Course_Desc_Model.findAll({});
            const dups = table?.map(x => x.course_id) || []

            if (dups?.includes(course_id)) {
                return res.status(400).json({ message: "This event is alreay exist in table!" });
            } else {

                // create course
                const course_desc = await Course_Desc_Model.create({
                    course_id,
                    description
                });

                res.status(201).json({
                    message: "Course description added successfully",
                    course_desc
                });
            }





        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    update: async (req, res) => {

        try {

            const { course_id, description } = req.body;
            const course_desc = await Course_Desc_Model.update({
                _id: req.params.id, course_id, description
            });

            res.status(201).json({
                message: "Course description updated successfully",
                course_desc
            });


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const { page, size } = req.query

            const desc = await Course_Desc_Model.findAll({ page, size });
            res.status(200).json(desc);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const course = await Course_Desc_Model.findById(req.params.id);
            if (!course) {
                return res.status(404).json({ message: "course description not found" });
            }
            res.json(course);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getCourseDescById: async (req, res) => {
        try {
            const course = await Course_Desc_Model.findCourseById(req.params.id);
            if (!course) {
                return res.status(404).json({ message: "Course description not found" });
            }
            res.json(course);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const course = await Course_Desc_Model.deleteById(req.params.id);
            if (!course) {
                return res.status(400).json({ message: "Course description not found!" });
            }
            return res.status(200).json({ message: "Course description deleted successfully!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getFilters: async (req, res) => {
        try {
            const { col, row } = req.query; // ✅ FIX

            if (!col || !row) {
                return res.status(400).json({ error: 'col and row are required' });
            }

            const users = await Course_Desc_Model.findFilterRecords({ col, row });

            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },


};

module.exports = course_desc;
