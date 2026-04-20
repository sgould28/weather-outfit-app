const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./clothes.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS clothes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            type TEXT,
            warmth_level INTEGER,
            waterproof INTEGER
        )
    `);
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
