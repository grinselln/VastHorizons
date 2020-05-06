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
app.use('/api/island', require('./routes/island'));
app.use('/api/hostIsland', require('./routes/hostIsland'));  
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));

// Routes
app.get('/', (req, res) => {
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

app.get('/hostIsland', isAuthenticated, (req, res) => {
  res.render("hostIsland.ejs", {user_id: req.session.userID, username: req.session.username, hasIsland: req.session.hasIsland});
}); 

app.get('/hostedIslands', (req, res) => {
  res.render("hostedIslands.ejs", {user_id: req.session.userID, username: req.session.username, hasIsland: req.session.hasIsland});
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
  // if a user and has island, continue as normal
  // if a user but did not register an island, force island creation
  if(req.session.userID && req.session.hasIsland)
    return next();
  else if (req.session.userID && !req.session.hasIsland)
    return res.redirect("/userIsland"); 

  // if not a user, do not allow them on this page
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