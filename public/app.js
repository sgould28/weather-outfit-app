document.getElementById("getOutfitBtn").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value.trim();
    const aesthetic = document.getElementById("aestheticSelect").value;
    const units = document.getElementById("unitSelect").value;
    const result = document.getElementById("result");

    if (!city) {
        result.innerHTML = "<p>Please enter a city.</p>";
        return;
    }

    result.innerHTML = "<p>Loading outfit...</p>";

    try {
        const res = await fetch(`/outfit?city=${encodeURIComponent(city)}&aesthetic=${encodeURIComponent(aesthetic)}&units=${encodeURIComponent(units)}`);
        const data = await res.json();

        if (!res.ok) {
            result.innerHTML = `<p class="error">${data.error || "Unable to get outfit."}</p>`;
            return;
        }

        const unitSymbol = data.weather.units === "imperial" ? "°F" : "°C";

        const formatItem = (item) => {
            if (!item) {
                return `<p>None</p>`;
            }

            return `
                <div class="outfit-item">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ""}
                    <div class="outfit-item-text">
                        <p>${item.name}</p>
                        ${item.image ? `<p class="image-note">Image included</p>` : ""}
                    </div>
                </div>
            `;
        };

        result.innerHTML = `
            <h2>Recommended Outfit</h2>
            <p>Aesthetic: ${data.aesthetic}</p>
            <p>Weather: ${data.weather.temp}${unitSymbol}, ${data.weather.description}</p>
            <div class="outfit-grid">
                <div>
                    <h3>Top</h3>
                    ${formatItem(data.outfit.top)}
                </div>
                <div>
                    <h3>Bottom</h3>
                    ${formatItem(data.outfit.bottom)}
                </div>
                <div>
                    <h3>Shoes</h3>
                    ${formatItem(data.outfit.shoes)}
                </div>
            </div>
        `;
    } catch (error) {
        result.innerHTML = "<p class=\"error\">Network error. Try again later.</p>";
    }
});
