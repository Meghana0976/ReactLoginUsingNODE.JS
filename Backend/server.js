const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Megha@1234",       // MySQL root password
    database: "userlogin"  // Change to your actual database name
});

app.post('/login', (req, res) => {
    console.log("Request body:", req.body);  // Log the request body for debugging

    // Correct SQL query with the actual table name (e.g., 'users')
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    const values = [
        req.body.username,  // Use 'username' from the frontend
        req.body.password
    ];

    // Log the SQL and values for debugging
    console.log("SQL Query:", sql);
    console.log("Values:", values);

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);  // Log the error for better insight
            return res.status(500).json({ error: "Login Failed", details: err });
        }

        if (data.length === 0) {
            console.log("No matching user found.");
            return res.status(400).json("Invalid username or password");
        }

        console.log("Login successful", data);  // Log the successful login data
        return res.json(data);  // Return the user data on successful login
    });
});

app.listen(8082, () => {
    console.log('port 8082 listening..............');
});
