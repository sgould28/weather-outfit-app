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
    { name: "Platform Sneakers", type: "shoes", warmth_level: 4, waterproof: 0, style: "edgy", image: "images/platform_sneakers.png" },
    { name: "Windbreaker", type: "top", warmth_level: 7, waterproof: 0, style: "casual", image: "images/windbreaker.png" },
    { name: "White Skirt", type: "bottom", warmth_level: 3, waterproof: 0, style: "cute", image: "images/white_skirt.png" },
    { name: "White Flowy Shirt", type: "top", warmth_level: 3, waterproof: 0, style: "cute", image: "images/white_flowy_tank.png" },
    { name: "Black Puffer Jacket", type: "top", warmth_level: 9, waterproof: 1, style: "edgy", image: "images/puffer.png" },
    { name: "Pink Plaid Skirt", type: "bottom", warmth_level: 4, waterproof: 0, style: "cute", image: "images/plaid_skirt.png" },
    { name: "Pink Tank Top", type: "top", warmth_level: 2, waterproof: 0, style: "cute", image: "images/pink_tank.png" },
    { name: "Pink Sweater", type: "top", warmth_level: 6, waterproof: 0, style: "cute", image: "images/pink_sweater.png" },
    { name: "Pink Long Sleeve Shirt", type: "top", warmth_level: 5, waterproof: 0, style: "cute", image: "images/pink_longsleeve.png" },
    {name: "Lightwash Jeans", type: "bottom", warmth_level: 5, waterproof: 0, style: "casual", image: "images/lightwash_jeans.png"},
    {name: "Distressed Jeans", type: "bottom", warmth_level: 5, waterproof: 0, style: "edgy", image: "images/distressed_jeans.png"},
    {name: "Denim Skirt", type: "bottom", warmth_level: 4, waterproof: 0, style: "edgy", image: "images/denim_skirt.png"},
    {name: "Pink Racer Jacket", type: "top", warmth_level: 7, waterproof: 0, style: "cute", image: "images/cute_racer.png"},
    {name: "Edgy Graphic Hoodie", type: "top", warmth_level: 8, waterproof: 0, style: "edgy", image: "images/cool_zipup.png"},
    {name: "Cheetah Skirt", type: "bottom", warmth_level: 4, waterproof: 0, style: "edgy", image: "images/cheetah_skirt.png"},
    {name: "Brown Skirt", type: "bottom", warmth_level: 4, waterproof: 0, style: "casual", image: "images/brown_skirt.png"},
    {name: "Black Converse", type: "shoes", warmth_level: 4, waterproof: 0, style: "edgy", image: "images/black_converse.png"},
    {name: "Black Hoodie", type: "top", warmth_level: 8, waterproof: 0, style: "casual", image: "images/black_hoodie.png"},
    {name: "Black Jorts", type: "bottom", warmth_level: 3, waterproof: 0, style: "edgy", image: "images/black_jorts.png"},
    {name: "Black Platform Heels", type: "shoes", warmth_level: 4, waterproof: 0, style: "edgy", image: "images/black_platforms.png"},
    {name: "Blue Sneakers", type: "shoes", warmth_level: 4, waterproof: 0, style: "casual", image: "images/blue_addidas.png"},
    {name: "Blue Zip-Up", type: "top", warmth_level: 7, waterproof: 0, style: "casual", image: "images/blue_zip.png"},
    {name: "Blueberry Tee", type: "top", warmth_level: 3, waterproof: 0, style: "casual", image: "images/blueberry_tee.png"},
    {name: "Grey Collared Sweater", type: "top", warmth_level: 6, waterproof: 0, style: "casual", image: "images/grey_collared_sweater.png"},
    {name: "Grey Long Sleeve Shirt", type: "top", warmth_level: 5, waterproof: 0, style: "casual", image: "images/grey_longsleeve.png"},
    {name: "Jean Skirt With a Belt", type: "bottom", warmth_level: 4, waterproof: 0, style: "edgy", image: "images/jean_belt_skirt.png"},
    {name: "Leather Skirt", type: "bottom", warmth_level: 5, waterproof: 1, style: "edgy", image: "images/leather_skirt.png"},
    {name: "Light Jeans", type: "bottom", warmth_level: 5, waterproof: 0, style: "casual", image: "images/light_jeans.png"},
    {name: "Pink Heels", type: "shoes", warmth_level: 4, waterproof: 0, style: "cute", image: "images/pink_heels.png"},
    {name: "Pink Hoodie", type: "top", warmth_level: 8, waterproof: 0, style: "cute", image: "images/pink_hoodie.png"},
    {name: "Red Lacy Tank Top", type: "top", warmth_level: 2, waterproof: 0, style: "edgy", image: "images/red_lace_tank.png"},
    {name: "Red Velvet Pants", type: "bottom", warmth_level: 6, waterproof: 0, style: "edgy", image: "images/red_velvet_pants.png"},
    {name: "Ripped Jeans", type: "bottom", warmth_level: 5, waterproof: 0, style: "edgy", image: "images/ripped_jeans.png"},
    {name: "Star Tube Top", type: "top", warmth_level: 2, waterproof: 0, style: "edgy", image: "images/star_tube_top.png"},
    {name: "Striped Shirt", type: "top", warmth_level: 5, waterproof: 0, style: "edgy", image: "images/striped_longsleeve.png"},
    {name: "White Puffer Jacket", type: "top", warmth_level: 9, waterproof: 1, style: "casual", image: "images/white_puffer.png"}

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

        const initClothesRows = () => {
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
        };

        const maybeAddImage = () => {
            if (!hasImage) {
                db.run("ALTER TABLE clothes ADD COLUMN image TEXT", err => {
                    if (err) {
                        console.error("Unable to add image column", err);
                        return;
                    }
                    initClothesRows();
                });
            } else {
                initClothesRows();
            }
        };

        if (!hasStyle) {
            db.run("ALTER TABLE clothes ADD COLUMN style TEXT DEFAULT 'casual'", err => {
                if (err) {
                    console.error("Unable to add style column", err);
                    return;
                }
                maybeAddImage();
            });
        } else {
            maybeAddImage();
        }
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
