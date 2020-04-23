const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();


app.set('view-engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'fuzzyslipers',
  resave: false,
  saveUninitialized: false
}));
app.use('/api/discord', require('./discord_api/discord'));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));


// Routes
app.get('/', (req, res) => {
  
  if(!req.session.userID){
    req.session.userID = "";
    req.session.username = "";
  }

  console.log("userID: ", req.session.userID);
  console.log("username: ", req.session.username);
  res.render("index.ejs", {user_id: req.session.userID, username: req.session.username});
});

app.use(function(req, res, next) {
  if (!req.session.userID ) {  
        return res.redirect('/');
      }   
      else {
          next();
      }
  });

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

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