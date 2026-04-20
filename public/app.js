document.getElementById("getOutfitBtn").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value;

    const res = await fetch(`/outfit?city=${city}`);
    const data = await res.json();

    document.getElementById("result").innerHTML = `
        <h2>Recommended Outfit</h2>
        <p>Top: ${data.top?.name || "None"}</p>
        <p>Bottom: ${data.bottom?.name || "None"}</p>
        <p>Shoes: ${data.shoes?.name || "None"}</p>
    `;
});
