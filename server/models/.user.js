const thinky = require('thinky')();
const type = thinky.type;
const bcrypt = require('bcrypt-nodejs');

const User = thinky.createModel('User', {
  email: type.string(),
  password: type.string()
});

User.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt, which takes time so then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) password using the salt, which takes time so then run cb
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      // then save the model
      next();
    });
  });
});

User.define('comparePassword', function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
});

module.exports = User;

/*

 // For use with MongoDB
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 const bcrypt = require('bcrypt-nodejs');

 // Define our user model
 // Ensure email is both unique and is saved in lower case
 const userSchema = new Schema({
 email: { type: String, unique: true, lowercase: true },
 password: String
 });


 // On Save Hook, encrypt password
 // Before saving a model, run this function
 userSchema.pre('save', function(next) {
 // get access to the user model
 const user = this;

 // generate a salt, which takes time so then run callback
 bcrypt.genSalt(10, function(err, salt) {
 if (err) { return next(err); }

 // hash (encrypt) password using the salt, which takes time so then run cb
 bcrypt.hash(user.password, salt, null, function(err, hash) {
 if (err) { return next(err); }

 // overwrite plain text password with encrypted password
 user.password = hash;
 // then save the model
 next();
 });
 });
 });

 // Helper to compare candidatePassword with saved password in database
 userSchema.methods.comparePassword = function(candidatePassword, callback) {
 bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
 if (err) { return callback(err); }

 callback(null, isMatch);
 });
 };

 // Create the model class

 const User = mongoose.model('user', userSchema);

 // Export the model

 module.exports = User;
 */