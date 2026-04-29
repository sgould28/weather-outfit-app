const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./clothes.db");

const defaultClothes = [
    { name: "Cozy Hoodie", type: "top", warmth_level: 8, waterproof: 1, style: "casual", image: "images/cozy_hoodie.png" },
    { name: "Light T-Shirt", type: "top", warmth_level: 3, waterproof: 0, style: "casual", image: "images/light_tshirt.png" },
    { name: "Denim Jacket", type: "top", warmth_level: 6, waterproof: 0, style: "casual", image: "images/denim_jacket.png" },
    { name: "Graphic Tee", type: "top", warmth_level: 3, waterproof: 0, style: "casual", image: "images/graphic_tee.png" },
    { name: "Floral Blouse", type: "top", warmth_level: 4, waterproof: 0, style: "cute", image: "images/floral_blouse.png" },
    { name: "Pastel Cardigan", type: "top", warmth_level: 5, waterproof: 0, style: "cute", image: "images/pastel_cardigan.png" },
    { name: "Leather Jacket", type: "top", warmth_level: 7, waterproof: 1, style: "edgy", image: "images/leather_jacket.png" },
    { name: "Band Tee", type: "top", warmth_level: 3, waterproof: 0, style: "edgy", image: "images/band_tee.png" },
    { name: "Jeans", type: "bottom", warmth_level: 6, waterproof: 0, style: "casual", image: "images/jeans.png" },
    { name: "Sweatpants", type: "bottom", warmth_level: 7, waterproof: 0, style: "casual", image: "images/sweatpants.png" },
    { name: "Cargo Shorts", type: "bottom", warmth_level: 2, waterproof: 0, style: "casual", image: "images/cargo_shorts.png" },
    { name: "Pleated Skirt", type: "bottom", warmth_level: 4, waterproof: 0, style: "cute", image: "images/pleated_skirt.png" },
    { name: "High-Waist Shorts", type: "bottom", warmth_level: 2, waterproof: 0, style: "cute", image: "images/high_waist_shorts.png" },
    { name: "Ripped Jeans", type: "bottom", warmth_level: 5, waterproof: 0, style: "edgy", image: "images/ripped_jeans.png" },
    { name: "Leather Pants", type: "bottom", warmth_level: 6, waterproof: 1, style: "edgy", image: "images/leather_pants.png" },
    { name: "Sneakers", type: "shoes", warmth_level: 4, waterproof: 0, style: "casual", image: "images/sneakers.png" },
    { name: "Rain Boots", type: "shoes", warmth_level: 6, waterproof: 1, style: "casual", image: "images/rain_boots.png" },
    { name: "Slip-On Sneakers", type: "shoes", warmth_level: 3, waterproof: 0, style: "casual", image: "images/slip_on_sneakers.png" },
    { name: "Ballet Flats", type: "shoes", warmth_level: 2, waterproof: 0, style: "cute", image: "images/ballet_flats.png" },
    { name: "Chunky Mary Janes", type: "shoes", warmth_level: 3, waterproof: 0, style: "cute", image: "images/chunky_mary_janes.png" },
    { name: "Combat Boots", type: "shoes", warmth_level: 6, waterproof: 1, style: "edgy", image: "images/combat_boots.png" },
    { name: "Platform Sneakers", type: "shoes", warmth_level: 4, waterproof: 0, style: "edgy", image: "images/platform_sneakers.png" }
];

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS clothes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            type TEXT,
            warmth_level INTEGER,
            waterproof INTEGER,
            style TEXT DEFAULT 'casual',
            image TEXT
        )
    `);

    db.all("PRAGMA table_info(clothes)", (err, columns) => {
        if (err) {
            console.error("Unable to inspect clothes schema", err);
            return;
        }

        const hasStyle = columns.some(column => column.name === "style");
        const hasImage = columns.some(column => column.name === "image");

        if (!hasStyle) {
            db.run("ALTER TABLE clothes ADD COLUMN style TEXT DEFAULT 'casual'");
        }

        if (!hasImage) {
            db.run("ALTER TABLE clothes ADD COLUMN image TEXT");
        }

        db.all("SELECT name, image FROM clothes", (err, rows) => {
            if (err) {
                console.error("Unable to read clothes rows", err);
                return;
            }

            const existingNames = new Set(rows.map(row => row.name));
            const insertStmt = db.prepare("INSERT INTO clothes (name, type, warmth_level, waterproof, style, image) VALUES (?, ?, ?, ?, ?, ?)");
            defaultClothes.forEach(item => {
                if (!existingNames.has(item.name)) {
                    insertStmt.run(item.name, item.type, item.warmth_level, item.waterproof, item.style, item.image || null);
                }
            });
            insertStmt.finalize();

            const updateStmt = db.prepare("UPDATE clothes SET image = ? WHERE name = ? AND (image IS NULL OR image = '')");
            defaultClothes.forEach(item => {
                if (item.image) {
                    updateStmt.run(item.image, item.name);
                }
            });
            updateStmt.finalize();
        });
    });
});

module.exports = {
    getClothes: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM clothes", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
};
