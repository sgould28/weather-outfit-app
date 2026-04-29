require("dotenv").config();
const API_KEY = process.env.OPENWEATHER_KEY;
const express = require("express");
const fetch = require("node-fetch");
const db = require("./db");
const pickOutfit = require("./outfitLogic");

const app = express();
app.use(express.static("public"));

app.get("/outfit", async (req, res) => {
    const city = req.query.city?.trim();
    const aesthetic = req.query.aesthetic?.trim().toLowerCase();
    const units = req.query.units?.trim().toLowerCase() || "metric";

    if (!city) {
        return res.status(400).json({ error: "City is required." });
    }

    const validAesthetics = ["casual", "cute", "edgy"];
    const validUnits = ["metric", "imperial"];

    if (aesthetic && !validAesthetics.includes(aesthetic)) {
        return res.status(400).json({ error: "Aesthetic must be casual, cute, or edgy." });
    }

    if (!validUnits.includes(units)) {
        return res.status(400).json({ error: "Units must be metric or imperial." });
    }

    if (!API_KEY) {
        return res.status(500).json({ error: "Missing OpenWeather API key." });
    }

    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`;
        const response = await fetch(weatherUrl);
        const weather = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: weather.message || "Unable to fetch weather data." });
        }

        const clothes = await db.getClothes();
        const outfit = pickOutfit(weather, clothes, aesthetic || "casual");

        res.json({
            aesthetic: aesthetic || "casual",
            weather: {
                temp: weather.main.temp,
                description: weather.weather[0].description,
                units
            },
            outfit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error retrieving outfit." });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
