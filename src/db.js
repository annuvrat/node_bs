
import sqlite3 from "sqlite3"

export const db = new sqlite3.Database('./dev.db',(err)=>{
    if (err)console.log(err);
    else console.log('database connected');
})


db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY uuid,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`,(err)=>{
    if (err)console.log(err);
    else console.log('table created');
})

/