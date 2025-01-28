require('dotenv').config();  // Load environment variables from .env file

const twilio = require('twilio');

// Load Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// Sending SMS
client.messages
  .create({
    body: 'Hello, Nikhil !',
    from: fromNumber,        // Twilio phone number from .env file
    to: '+918600446653',     // The recipient's phone number
  })
  .then(message => console.log(`Message sent with SID: ${message.sid}`))
  .catch(error => console.error("Error sending SMS:", error));
