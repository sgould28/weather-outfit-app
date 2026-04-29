document.getElementById("getOutfitBtn").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value.trim();
    const aesthetic = document.getElementById("aestheticSelect").value;
    const result = document.getElementById("result");

    if (!city) {
        result.innerHTML = "<p>Please enter a city.</p>";
        return;
    }

    result.innerHTML = "<p>Loading outfit...</p>";

    try {
        const res = await fetch(`/outfit?city=${encodeURIComponent(city)}&aesthetic=${encodeURIComponent(aesthetic)}`);
        const data = await res.json();

        if (!res.ok) {
            result.innerHTML = `<p class="error">${data.error || "Unable to get outfit."}</p>`;
            return;
        }

        result.innerHTML = `
            <h2>Recommended Outfit</h2>
            <p>Aesthetic: ${data.aesthetic}</p>
            <p>Weather: ${data.weather.temp}°C, ${data.weather.description}</p>
            <p>Top: ${data.outfit.top?.name || "None"}</p>
            <p>Bottom: ${data.outfit.bottom?.name || "None"}</p>
            <p>Shoes: ${data.outfit.shoes?.name || "None"}</p>
        `;
    } catch (error) {
        result.innerHTML = "<p class=\"error\">Network error. Try again later.</p>";
    }
});
