const express = require('express');
const app = express();
const {google} = require('googleapis');
const Photos = require('googlephotos');
require('dotenv').config();


//const https = require('https');
//const download = require('image-downloader');
//const fs = require('fs');

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRCET_URI,
  );

// photoslibrary.readonly
//const scopes = [Photos.Scopes.READ_ONLY, Photos.Scopes.SHARING];

//const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  //access_type: 'offline',

  // If you only need one scope you can pass it as a string
  //scope: scopes,
//});

//console.log(url);

//const {tokens} = oauth2Client.getToken(code);


const photos = new Photos(process.env.ACCESS_TOKEN);

async function listMediaItems(){
  try{
    const mediaItemsList = await photos.mediaItems.list()
    console.log("This is the list of media items: ")
    console.log(mediaItemsList)
    console.log("\n")
    console.log("This is the MediaMetadata of the first mediaitem: ")
    console.log("\n")
    console.log(mediaItemsList[ 'mediaItems' ][0].mediaMetadata)
  } catch(error){
    console.log(error.message)
  }
} 

async function listAlbums(){
  try{
    const albumsList = await photos.albums.list()
    console.log("This is the list of albums: ")
    console.log(albumsList); 
    console.log("\n")
  } catch(error){
    console.log(error.message)
  }
} 

//async function getAlbumIds(){
  //try{
    //const albumsList = await photos.albums.list()
    //const AlbumIds = []
    //for(let i=0; i< Object.keys(albumsList["albums"]).length ;i++){
      //AlbumIds[i] = albumsList[ 'albums' ][i]["id"]
      //console.log(AlbumIds[i])
    //}
    //return AlbumIds
  //}catch(error){
    //console.log(error.message)
  //}
//}

async function listAlbumContents(){
  try{
    const albumsList = await photos.albums.list()
    const albumContent = []
    for(let i=0; i< Object.keys(albumsList["albums"]).length ;i++){
      albumContent[i] = await photos.mediaItems.search(albumIdOrFilters= albumsList[ 'albums' ][i].id)
      albumContent[i] = JSON.stringify(albumContent[i])
    }
    console.log("This is the list of contents of second album: ")
    console.log(albumContent[1])
    console.log("\n")
  }catch(error){
    console.log(error.message)
  }
}


listMediaItems();

listAlbums();

listAlbumContents();

//function downloadImage(url,filepath){
  //https.get(url, (res) => { 
    //res.pipe(fs.createWriteStream(filepath));
  //});
//}

//function Downloadd(url,filepath){
  //return download.image({
    //url,
    //dest: filepath
  //})
//}

//const url = 'https://en.wikipedia.org/wiki/Hello'
//const filepath = 'F:/computerscience/Seagull/GooglePhotosAPI/Images'
//downloadImage(url,filepath);
//Downloadd(url,filepath)

//app.get('/',(req,res) => {
  //  res.send('API is running successfuly!');
//})

//app.listen(7777, () => console.log('Server is listening to port 7777'));

//const albumsList = JSON.stringify(listAlbums());
//console.log(albumsList);

//photos.mediaItems.batchGet
//enrichment
//patch 
//accessmediaitems