const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');

app.set('view-engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'fuzzyslipers',
  resave: false,
  saveUninitialized: false
}));
app.use(methodOverride('_method'))
app.use('/api/discord', require('./discord_api/discord'));
app.use('/api/island', require('./routes/island/island')); 
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));

// Routes
app.get('/', (req, res) => {
  
  if(!req.session.userID){
    req.session.userID = "";
    req.session.username = "";
    req.session.hasIsland = 0;
  }

  console.log("userID: ", req.session.userID);
  console.log("username: ", req.session.username);
  console.log("has island: ", req.session.hasIsland);
  res.render("index.ejs", {user_id: req.session.userID, username: req.session.username});
});

app.get('/profile', isAuthenticated, (req, res) => {
  res.render("profile.ejs", {user_id: req.session.userID, username: req.session.username, hasIsland: req.session.hasIsland});
});

app.get('/island', (req, res) => {
  res.render("island.ejs", {user_id: req.session.userID, username: req.session.username, hasIsland: req.session.hasIsland});
}); 

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

//404 Route
app.get('*', function(req, res){
  res.status(404).render('404.ejs');
});

function isAuthenticated(req, res, next){
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if(req.session.userID && req.session.hasIsland)
    return next();
  if (req.session.userID && !req.session.hasIsland)
    return res.redirect("/userIsland"); 

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/');
}

app.listen(50451, () => {
  console.info('Running on port 50451');
});

app.use((err, req, res, next) => {
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message,
      });
  }
});