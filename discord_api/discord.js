const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const axios = require('axios')
const session = require('express-session');
const { catchAsync } = require('../utils');
var db = require('../models');
const router = express.Router();

const CLIENT_ID = process.env.vh_clientID;
const CLIENT_SECRET = process.env.vh_secretID;
const redirect = encodeURIComponent('http://localhost:50451/api/discord/callback');

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');

  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const url = 'https://discordapp.com/api/oauth2/token';
  const code = req.query.code;

  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  
  const authJson = await response.json();
  const token = authJson.access_token;

  const user = await fetch('https://discordapp.com/api/users/@me',
  {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userJson = await user.json();
  const discordID = userJson.id;

  db.User.exists({ discord_id: discordID })
  .then(function(foundUser){
    if(foundUser == false){  //create entry
      //add to db
      const user = {
        discord_id: discordID,
        username: json2.username,
        discriminator: json2.discriminator,
        verified: 0,
        email: "",
      }
      
      db.User.create(user)
      .then(function(newUser){
        req.session.userID = newUser.discord_id;
        req.session.username = newUser.username + "#" + newUser.discriminator;
        req.session.hasIsland = 0;
        res.redirect('/island');
      })
      .catch(function(err){
          res.send(err);
      })
    }
    else{
      db.User.find({"discord_id": discordID})
        .then(function(foundUser){
          console.log("found user");
          req.session.userID = foundUser[0].discord_id;
          req.session.username = foundUser[0].username + "#" + foundUser[0].discriminator;
          
          db.Island.exists({ discord_id: discordID })
            .then(function(foundIsland){
              if(foundIsland){
                console.log("found: ", foundIsland);
                req.session.hasIsland = 1;
                res.redirect('/');
              }
              else{
                console.log("not found: ", foundIsland);
                req.session.hasIsland = 0;
                res.redirect('/island');
              }
            })
            .catch(function(err){
              res.send(err);
            })
        })
        .catch(function(err){
            res.send(err);
        })
    }
  })
  .catch(function(err){
    res.send(err);
  });
}))

module.exports = router;