function pickOutfit(weather, clothes) {
    const temp = weather.main.temp;
    const raining = weather.weather[0].main.toLowerCase().includes("rain");

    let candidates = clothes;

    if (temp < 10) {
        candidates = candidates.filter(c => c.warmth_level >= 7);
    } else if (temp > 25) {
        candidates = candidates.filter(c => c.warmth_level <= 3);
    }

    if (raining) {
        candidates = candidates.filter(c => c.waterproof === 1);
    }

    return {
        top: candidates.find(c => c.type === "top"),
        bottom: candidates.find(c => c.type === "bottom"),
        shoes: candidates.find(c => c.type === "shoes")
    };
}

module.exports = pickOutfit;
