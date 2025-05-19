import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:"); // 🚀 Creates an in-memory database

db.serialize(() => {
    db.run("CREATE TABLE users (id TEXT PRIMARY KEY, nickname TEXT, email TEXT, password TEXT, acceptTerms BOOLEAN)");
});

export default db;
