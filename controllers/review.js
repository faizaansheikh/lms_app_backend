const ReviewModel = require("../models/review");



const ReviewController = {

    create: async (req, res) => {
        try {
            const { name, review, course_id, rating } = req.body;



            const reviews = await ReviewModel.create({
                name, review, course_id, rating
            });



            res.status(201).json({
                message: "Review added successfully!",
                reviews
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    update: async (req, res) => {
        try {
            const { _id, name, review, course_id, rating } = req.body;

            // update user
            const reviews = await ReviewModel.update({
                _id, name, review, course_id, rating
            });

            res.status(201).json({
                message: "Review updated successfully",
                reviews
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const { page, size } = req.query

            const review = await ReviewModel.findAll({
                page, size
            });
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const review = await ReviewModel.findById(req.params.id);
            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }
            res.json(review);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const review = await ReviewModel.deleteById(req.params.id);
            if (!review) {
                return res.status(400).json({ message: "Review not found!" });
            }
            return res.status(200).json({ message: "Review deleted successfully!" });
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

            const users = await ReviewModel.findFilterRecords({ col, row });

            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ReviewController;
