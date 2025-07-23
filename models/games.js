const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gameDesc:{
        type: String,
        default: false
    },
    isWorthPlaying: {
        type: Boolean,
        default: false
    }
}, {timestaps:true})

const Game = mongoose.model("game",gameSchema)
module.exports = Game