const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database
const db = new sqlite3.Database('./appointments.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the appointments database.');

        // Create the appointments table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            mobile TEXT,
            email TEXT,
            appointmentDateTime TEXT NOT NULL,
            address TEXT NOT NULL,
            product TEXT NOT NULL,
            comments TEXT
        )`, (err) => {
            if (err) {
                console.log('Error creating table', err.message);
            } else {
                console.log('Appointments table created or already exists.');
            }
        });
    }
});

module.exports = db;
