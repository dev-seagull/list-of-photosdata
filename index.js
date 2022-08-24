const express = require('express');
const app = express();
const {google} = require('googleapis');
const { apigateway } = require('googleapis/build/src/apis/apigateway');
const Photos = require('googlephotos');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRCET_URI,
  );

const photos = new Photos(process.env.ACCESS_TOKEN);

app.get('/',(req,res) => {
    res.send('API is running successfuly!');
})

app.listen(7777, () => console.log('Server is listening to port 7777'));