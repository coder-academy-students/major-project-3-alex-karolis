const thinkyOptions = {
  db: 'supersearch',
  host: 'localhost',
  port: 28015
};

const thinky = require('thinky')(thinkyOptions);
const type = thinky.type;
const bcrypt = require('bcrypt-nodejs');

const User = thinky.createModel('User', {
  email: type.string(),
  password: type.string(),
  firstname: type.string(),
  lastname: type.string(),
  bio: type.string(),
  image: type.string()
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

const DataComment = thinky.createModel('DataComment', {
  id: type.string(),
  email: type.string(),
  comment: type.string(),
  postId: type.string(),
  createdAt: type.date()
});

const Data = thinky.createModel('Data', {
  id: type.string(),
  email: type.string(),
  title: type.string(),
  post: type.string(),
  image: type.string(),
  comments: type.array(),
  votes: [{
    upVote: type.boolean(),
    createdAt: type.date(),
    voterId: type.string()
  }],
  createdAt: type.date()
});

Data.pre('save', function(next) {
  const data = this;
  data.createdAt = new Date();
  next();
});

DataComment.pre('save', function(next) {
  const comment = this;
  comment.createdAt = new Date();
  next();
});

Data.hasMany(DataComment, 'comments', 'id', 'postId');

module.exports = {
  Data,
  DataComment,
  User
};

