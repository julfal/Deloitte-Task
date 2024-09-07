const db = require('./database');  // Import the SQLite database connection
require('dotenv').config({ path: './details.env'});  // Load environment variables from the .env file

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path'); // Required to serve static files
const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static frontend files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle form submissions
app.post('/schedule', (req, res) => {
    const { name, surname, mobile, email, appointmentDateTime, address, product, comments } = req.body;

    if (!mobile && !email) {
        res.status(400).send('Error: Please provide either a mobile number or an email address.');
        return;
    }

    // Set contactInfo based on available data
    const contactInfo = email || mobile; // Prefer email if provided

    // Insert the form data into the database
    const sql = `INSERT INTO appointments (name, surname, mobile, email, appointmentDateTime, address, product, comments)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [name, surname, mobile, email, appointmentDateTime, address, product, comments];

    db.run(sql, params, function(err) {
        if (err) {
            console.log('Error inserting data into the database:', err.message);
            res.status(500).send('Error storing appointment.');
        } else {
            console.log(`Appointment stored with ID: ${this.lastID}`);

            // Email sending logic (as before)
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,  // Use environment variable for email username
                    pass: process.env.EMAIL_PASS   // Use environment variable for email password
                }
            });

            let mailOptions = {
                from: process.env.EMAIL_USER,  // Use your email address stored in environment variables
                to: contactInfo,  // The recipient's email address
                subject: 'Appointment Scheduled',
                text: `Hello ${name},\n\nYour appointment for ${product} is scheduled at ${appointmentDateTime} at ${address}.\n\nComments: ${comments}\n\nThank you!`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    res.status(500).send('Error sending email.');
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send('Appointment scheduled and stored successfully.');
                }
            });
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
