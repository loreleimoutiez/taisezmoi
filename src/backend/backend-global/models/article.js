/* eslint-disable */
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
