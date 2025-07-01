/* eslint-disable */
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    category: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String }] // Array des identifiants uniques (hash IP + localStorage)
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
