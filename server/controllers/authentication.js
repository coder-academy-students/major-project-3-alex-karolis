const jwt = require('jwt-simple');
const config = require('../config');
const { User } = require('../models/search_data');

// Create JWT for the user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // subject of token is the user.id, issued at timestamp is now
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

// User SIGNIN
exports.signin = function (req, res) {
  // User has had their username and password authenticated by requireSignin in router
  // We now need to give them a token

  // Passport supplies req.user
  res.send({ token: tokenForUser(req.user) })
};

// Create SIGNUP
exports.signup = function (req, res) {

  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const bio = req.body.bio;
  const image = req.body.image;

  // Data validation
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' });
  }

  // See if a user with the given email exists
  User.filter({ email: email }).run()
    .then(function (result) {
      console.log(result);
        // Prevent duplicate users
        if (result.some(user => user.email === email)) {
          return res.status(422).send({ error: 'Email is in use' });
        } else {
          // If a user with email does NOT exist, create and save user record
          const user = new User({
            email,
            password,
            firstname,
            lastname,
            bio,
            image
          });

          user.save()
            .then(function () {
              // Respond to request indicating the user was created
              res.json({ token: tokenForUser(user) });
            })
            .catch(function (err) {
              res.send(err);
            });
        }
      })
    .catch(function(err) {
      console.log(err);
    });
};

/*
 // When using with MongoDB
 const jwt = require('jwt-simple');
 const config = require('../config');
 const User = require('../models/user');

 // Create JWT for the user
 function tokenForUser(user) {
 const timestamp = new Date().getTime();
 // subject of token is the user.id, issued at timestamp is now
 return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
 }

 // User SIGNIN
 exports.signin = function (req, res, next) {
 // User has had their username and password authenticated by requireSignin in router
 // We now need to give them a token

 // Passport supplies req.user
 res.send({ token: tokenForUser(req.user) })
 };

 // Create SIGNUP
 exports.signup = function (req, res, next) {

 const email = req.body.email;
 const password = req.body.password;

 // Data validation
 if (!email || !password) {
 return res.status(422).send({ error: 'You must provide an email and password' });
 }

 // See if a user with the given email exists
 User.findOne({ email: email }, function (err, existingUser) {
 if (err) { return next(err); }

 // If a user with email does exist, return an error
 if (existingUser) {
 return res.status(422).send({ error: 'Email is in use' });
 }

 // If a user with email does NOT exist, create and save user record
 const user = new User({
 email: email,
 password: password
 });

 user.save(function (err) {
 if (err) { return next(err); }

 // Respond to request indicating the user was created
 res.json({ token: tokenForUser(user) });
 });
 });
 }

 */