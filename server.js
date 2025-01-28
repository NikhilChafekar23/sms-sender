require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// API endpoint to send SMS
app.post('/send-sms', async (req, res) => {
    const { phoneNumber, message } = req.body;

    try {
        const response = await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: phoneNumber,
        });
        res.status(200).json({ success: true, message: 'SMS sent successfully', sid: response.sid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
