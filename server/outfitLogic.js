function pickOutfit(weather, clothes, aesthetic = "casual", units = "metric") {
    const temp = weather?.main?.temp ?? 20;
    const raining = weather?.weather?.[0]?.main.toLowerCase().includes("rain");
    const style = (aesthetic || "casual").toLowerCase();

    let candidates = clothes.slice();
    const styleMatches = candidates.filter(c => c.style === style || c.style === "all");
    if (styleMatches.length) {
        candidates = styleMatches;
    }

    if (units === "metric") {
        // Celsius thresholds
        if (temp < 10) {
            const coldCandidates = candidates.filter(c => c.warmth_level >= 7);
            if (coldCandidates.length) candidates = coldCandidates;
        } else if (temp > 25) {
            const warmCandidates = candidates.filter(c => c.warmth_level <= 4);
            if (warmCandidates.length) candidates = warmCandidates;
        }
    } else if (units === "imperial") {
        // Fahrenheit thresholds
        if (temp < 50) {
            const coldCandidates = candidates.filter(c => c.warmth_level >= 7);
            if (coldCandidates.length) candidates = coldCandidates;
        } else if (temp > 77) {
            const warmCandidates = candidates.filter(c => c.warmth_level <= 4);
            if (warmCandidates.length) candidates = warmCandidates;
        }
    }

    if (raining) {
        const rainCandidates = candidates.filter(c => c.waterproof === 1);
        if (rainCandidates.length) {
            candidates = rainCandidates;
        }
    }

    const pickRandom = (items) => {
        if (!items.length) return null;
        return items[Math.floor(Math.random() * items.length)];
    };

    const pick = (type) => {
        const typeCandidates = candidates.filter(c => c.type === type);
        if (typeCandidates.length) {
            return pickRandom(typeCandidates);
        }
        const fallbackCandidates = clothes.filter(c => c.type === type && (c.style === style || c.style === "all"));
        return pickRandom(fallbackCandidates);
    };

    return {
        top: pick("top"),
        bottom: pick("bottom"),
        shoes: pick("shoes")
    };
}

module.exports = pickOutfit;
