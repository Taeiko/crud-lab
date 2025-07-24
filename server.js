const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const Game = require('./models/games')
const methodOverride = require('method-override')
//middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


async function connecttoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected successfully')
    } catch (error) {
        console.log('failed to connect')
    }
}
connecttoDB()


//routes 

// ---------------------------------CREATE---------------------------
app.get("/games/create", (req, res) => {
    res.render("create.ejs")
})

app.post("/games/create", async (req, res) => {
    console.log(req.body)
    if (req.body.isWorthPlaying === "on") {
        req.body.isWorthPlaying = true
    }
    console.log(req.body)
    try {
        await Game.create(req.body)
        res.redirect('/games/create')
    } catch (error) {
        console.log(error)
    }
})

// ---------------------------------------READ------------------------
app.get("/games", async(req,res)=>{
    try {
        const allGames = await Game.find()
        res.render("all-games.ejs", {allGames: allGames})
    } catch (error) {
        console.log(error)
    }
})

app.get("/games/:gameId", async(req,res)=>{
    try { const foundGame = await Game.findById(req.params.gameId)
    console.log(foundGame)
    res.render("game-details.ejs",{foundGame})
    } catch (error){
        console.log(error)
    }
})
// ---------------------------------UPDATE-------------------------------

app.get("/games/update/:id", async (req,res)=>{
try { const foundGame = await Game.findById(req.params.id)
res.render("game-update.ejs", {foundGame})
} catch (error){
    console.log(error)
}
})

app.put("/games/update/:gameId", async (req,res)=>{
    console.log(req.params.id, req.body)
    const updatedGame = await Game.findByIdAndUpdate(req.params.gameId, req.body)
    if (req.body.isWorthPlaying === "on"){
        req.body.isWorthPlaying = true
    }
    res.redirect('/games')
})

// --------------------------------------DELETE---------------
app.post('/games/delete/:id', async (req,res)=>{
    console.log(req.params)
    try{
        const deletedGame = await Game.findByIdAndDelete(req.params.id)
        res.redirect("/games")
    } 
    catch (error) {
        console.log(error)
    }
})

app.listen(3000, () => {
    console.log('port 3k active')
})