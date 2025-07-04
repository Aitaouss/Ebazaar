const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "base.db");
const sqlPath = path.join(__dirname, "struct.sql");

function migrate() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) return reject(err);
    });

    const sql = fs.readFileSync(sqlPath, "utf8");

    db.exec(sql, (err) => {
      if (err) return reject(err);
      console.log("✅ Migration successful.");
      resolve();
    });
  });
}

module.exports = migrate;
