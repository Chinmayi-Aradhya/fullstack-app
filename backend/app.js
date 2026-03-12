const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// Correct PostgreSQL connection string
const pool = new Pool({
    connectionString:
    process.env.DATABASE_URL || "postgres://postgres:mysecretpassword@localhost:5432/postgres",
});

// GET all users
app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users ORDER BY id");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// CREATE user
app.post("/api/users", async (req, res) => {
    try {
        const { name, email } = req.body;
        const result = await pool.query(
            "INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *",
            [name, email]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE user
app.delete("/api/users/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = app;
