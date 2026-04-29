function pickOutfit(weather, clothes, aesthetic = "casual") {
    const temp = weather?.main?.temp ?? 20;
    const raining = weather?.weather?.[0]?.main.toLowerCase().includes("rain");
    const style = (aesthetic || "casual").toLowerCase();

    let candidates = clothes.slice();
    const styleMatches = candidates.filter(c => c.style === style || c.style === "all");
    if (styleMatches.length) {
        candidates = styleMatches;
    }

    if (temp < 10) {
        const coldCandidates = candidates.filter(c => c.warmth_level >= 7);
        if (coldCandidates.length) candidates = coldCandidates;
    } else if (temp > 25) {
        const warmCandidates = candidates.filter(c => c.warmth_level <= 4);
        if (warmCandidates.length) candidates = warmCandidates;
    }

    if (raining) {
        const rainCandidates = candidates.filter(c => c.waterproof === 1);
        if (rainCandidates.length) {
            candidates = rainCandidates;
        }
    }

    const pick = (type) => {
        return candidates.find(c => c.type === type) || clothes.find(c => c.type === type) || null;
    };

    return {
        top: pick("top"),
        bottom: pick("bottom"),
        shoes: pick("shoes")
    };
}

module.exports = pickOutfit;
