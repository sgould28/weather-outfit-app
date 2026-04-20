const express = require("express");
const fetch = require("node-fetch");
const db = require("./db");
const pickOutfit = require("./outfitLogic");

const app = express();
app.use(express.static("public"));

app.get("/outfit", async (req, res) => {
    const city = req.query.city;

    // Fetch weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_KEY`;
    const weather = await fetch(weatherUrl).then(r => r.json());

    // Get clothes from DB
    const clothes = await db.getClothes();

    // Pick outfit
    const outfit = pickOutfit(weather, clothes);

    res.json(outfit);
});

app.listen(3000, () => console.log("Server running on port 3000"));
