const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Data = new Schema(
    {
        result: { type: [Object], required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('data', Data)