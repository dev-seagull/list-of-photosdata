const express = require('express');
const app = express();
const {google} = require('googleapis');
const { analytics } = require('googleapis/build/src/apis/analytics');
const Photos = require('googlephotos');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRCET_URI,
  );

const photos = new Photos(process.env.ACCESS_TOKEN);


async function listMediaItems(){
  try{
    const albumsList = await photos.mediaItems.list()
    console.log(albumsList)
  } catch(error){
    console.log(error.message)
  }
} 

listMediaItems();

app.get('/',(req,res) => {
    res.send('API is running successfuly!');
})


app.listen(7777, () => console.log('Server is listening to port 7777'));