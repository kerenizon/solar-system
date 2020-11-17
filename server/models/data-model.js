const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Data = new Schema(
    {
        details: [{ type: String, required: true }]
    },
    { timestamps: true },
)

module.exports = mongoose.model('data', Data)