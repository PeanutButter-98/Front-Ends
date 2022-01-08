const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    metaData: {
        type: String,
        required: true
    },
    Markdown: {
        type: String,
        required: true
    },
    createdAt: 
    {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("article", BlogSchema)