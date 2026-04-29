const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./clothes.db");

const defaultClothes = [
    { name: "Cozy Hoodie", type: "top", warmth_level: 8, waterproof: 1, style: "casual" },
    { name: "Light T-Shirt", type: "top", warmth_level: 3, waterproof: 0, style: "casual" },
    { name: "Dress Shirt", type: "top", warmth_level: 4, waterproof: 0, style: "formal" },
    { name: "Blazer", type: "top", warmth_level: 6, waterproof: 0, style: "formal" },
    { name: "Sport Jacket", type: "top", warmth_level: 5, waterproof: 1, style: "sporty" },
    { name: "Jeans", type: "bottom", warmth_level: 6, waterproof: 0, style: "casual" },
    { name: "Chinos", type: "bottom", warmth_level: 5, waterproof: 0, style: "formal" },
    { name: "Shorts", type: "bottom", warmth_level: 2, waterproof: 0, style: "sporty" },
    { name: "Sweatpants", type: "bottom", warmth_level: 7, waterproof: 0, style: "casual" },
    { name: "Sneakers", type: "shoes", warmth_level: 4, waterproof: 0, style: "casual" },
    { name: "Dress Shoes", type: "shoes", warmth_level: 3, waterproof: 0, style: "formal" },
    { name: "Running Shoes", type: "shoes", warmth_level: 3, waterproof: 1, style: "sporty" },
    { name: "Rain Boots", type: "shoes", warmth_level: 6, waterproof: 1, style: "casual" }
];

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS clothes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            type TEXT,
            warmth_level INTEGER,
            waterproof INTEGER,
            style TEXT DEFAULT 'casual'
        )
    `);

    db.all("PRAGMA table_info(clothes)", (err, columns) => {
        if (err) {
            console.error("Unable to inspect clothes schema", err);
            return;
        }

        const hasStyle = columns.some(column => column.name === "style");
        if (!hasStyle) {
            db.run("ALTER TABLE clothes ADD COLUMN style TEXT DEFAULT 'casual'");
        }

        db.get("SELECT COUNT(*) AS count FROM clothes", (err, row) => {
            if (err) {
                console.error("Unable to count clothes rows", err);
                return;
            }

            if (!row.count) {
                const stmt = db.prepare("INSERT INTO clothes (name, type, warmth_level, waterproof, style) VALUES (?, ?, ?, ?, ?)");
                defaultClothes.forEach(item => {
                    stmt.run(item.name, item.type, item.warmth_level, item.waterproof, item.style);
                });
                stmt.finalize();
            }
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
