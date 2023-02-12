const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: Number,
        required: true,
        default: 0
    },
    creationDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema)