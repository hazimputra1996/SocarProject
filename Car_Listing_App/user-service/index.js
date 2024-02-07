const express = require('express');
const auth = require('./auth');
const passport= require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

function isLoggedIn(req, res, next) {
    req.user? next() : res.sendStatus(401);
}

const app = express();
app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  // Check if the connection is successful
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/failure', (req, res) => {
    res.send('something went wrong..');    
});

app.get('/protected', isLoggedIn, (req,res)=> {
    res.send('Hello');
});

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            }
            res.send('GoodBye!!');
        });
    });
});


app.listen(8001, () => console.log('User-listing listen to port 8001'));