const express = require('express');
const app = express();
const {google} = require('googleapis');
const Photos = require('googlephotos');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRCET_URI,
  );

const scopes = [Photos.Scopes.READ_ONLY, Photos.Scopes.SHARING];

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
});

console.log(url);

app.get('/',(req,res) => {
    res.send('API is running successfuly!');
})

app.listen(7777, () => console.log('Server is listening to port 7777'));