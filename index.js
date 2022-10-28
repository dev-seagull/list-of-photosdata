const express = require('express');
const Photos = require('googlephotos');
const fs = require('fs');
require('dotenv').config();


//const oauth2Client = new google.auth.OAuth2(
//    process.env.CLIENT_ID,
//    process.env.CLIENT_SECRET,
//    process.env.REDIRCET_URI,
//  );
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
    let mediaItemsList = await photos.mediaItems.list()
    mediaItemsList = JSON.stringify(mediaItemsList);

    fs.writeFile("mediaItems.json", mediaItemsList, (err) => {
      if (err) 
      console.log("An error occured while writing JSON Object to File.");
      else {
      console.log("mediaItems file has been saved.");
      } 
    });

  } catch(error){
    console.log(error.message)
  }
} 


async function listAlbums(){
  try{
    let albumsList = await photos.albums.list()
    albumsList = JSON.stringify(albumsList);
    
    fs.writeFile("albumsList.json", albumsList, (err) => {
      if (err) 
      console.log("An error occured while writing JSON Object to File.");
      else {
      console.log("albumList file has been saved.");
      } 
    });
  } catch(error){
    console.log(error.message)
  }
} 


async function listAlbumContents(){
  try{
    let albumsList = await photos.albums.list()
    let albumsContent = []

    for(let i=0; i< Object.keys(albumsList["albums"]).length ;i++){
      albumsContent[i] = await photos.mediaItems.search(albumIdOrFilters= albumsList[ 'albums' ][i].id)
      albumsContent[i] = JSON.stringify(albumsContent[i])
    }

    albumsContent = JSON.stringify(albumsContent);

    fs.writeFile("albumsContents.json", albumsContent, (err) => {
      if (err) 
      console.log("An error occured while writing JSON Object to File.");
      else {
      console.log("albumsContents file has been saved.");
      } 
    });
  }catch(error){
    console.log(error.message)
  }
}


listMediaItems();
listAlbums();
listAlbumContents();

//const https = require('https');
//const download = require('image-downloader');
//const fs = require('fs');
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


//photos.mediaItems.batchGet
//enrichment 
//accessmediaitems