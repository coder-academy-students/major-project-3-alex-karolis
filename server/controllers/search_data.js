const { User, Data, DataComment } = require('../models/search_data');
const thinky = require('thinky')();
const r = thinky.r;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jwt-simple');
const config = require('../config');

exports.getData = function (req, res, next) {

  //  Expect an object with two keys
  //  {
  //    type: 'type of search',
  //    terms: 'search terms'
  //  }

  //  Return
  //    { error, terms } || [{result1}, {result2}, ...]

  const searchType = req.body.type;
  const searchTerms = req.body.terms;

  switch (searchType) {
    // Search for an exact email match
    case 'email':
      return Data.filter({ email: searchTerms }).run()
        .then(function(result) {
          res.json(result);
        })
        .catch(function(err) {
          res.json(err);
        });
    // Search in title field for titles that contain the search terms
    case 'title':
      return Data.filter(r.row('title').match(searchTerms)).run()
        .then(function(result) {
          res.json(result);
        })
        .catch(function(err) {
          res.json(err);
        });
    // Search in post field for posts that contain the search terms
    case 'post':
      return Data.filter(r.row('post').match(searchTerms)).run()
        .then(function(result) {
          res.json(result);
        })
        .catch(function(err) {
          res.json(err);
        });
    // Search in title field for titles that contain the search terms
    case 'recent':
      return Data.orderBy('createdAt').limit(3).run()
        .then(function(result) {
          res.json(result);
        })
        .catch(function(err) {
          res.json(err);
        });

    default:
      res.json({error: 'error on server', terms: searchTerms });
  }
};

// SAVE DATA DETAILS

exports.setData = function (req, res, next) {

  const token = req.header('authorization');
  const decodedJWT = jwt.decode(token, config.secret).sub;

  User.get(decodedJWT).run()
    .then(function(user) {
      // Check a user exists and that there is only one
      if (user) {
        // Set email and comment

        const email = user.email;
        const title = req.body.title;
        const post = req.body.post;
        const image = req.body.image;
        const votes = [];

        // Create a new data object
        const data = new Data({ email, title, post, image, votes });

        data.save()
          .then(function (data) {
           res.send(data);
          })
          .catch(function (err) {
            res.send(err);
          });
      } else {
       console.log('could not find user');
      }
    })
    .catch(function(err) {
      console.log('ERROR', err);
      res.json(err);
    });
};

// DELETE DATA

exports.deleteData = function (req, res) {

  const token = req.header('authorization');
  const decodedJWT = jwt.decode(token, config.secret).sub;
  const postId = req.body.id;

  User.get(decodedJWT).run()
    .then(function(user) {
      if (user) {

        Data.get(postId).delete()
          .then(function (response) {
            res.send({ server: 'post deleted' })
          })
          .catch(function (err) {
            console.log('catch error', err);
            res.send(err);
          });

      } else {
        console.log('could not find user');
      }
    })
    .catch(function(err) {
      console.log('ERROR', err);
      res.send(err);
    });
};

// UPDATE POST IN DATA

exports.updateData = function (req, res) {

  const dataId = req.body.postId;
  const post = req.body.postText;
  console.log(post);

  Data.get(dataId).update({post: post}).run()
    .then(function() {
      Data.get(dataId).getJoin().run().then(function(result){ res.json(result)})
    })
    .catch(function (err) {
      console.log('catch error', err);
      res.send(err);
    });

};

// ADD COMMENT TO DATA

exports.setDataComment = function (req, res) {

  const token = req.header('authorization');
  const decodedJWT = jwt.decode(token, config.secret).sub;

  User.get(decodedJWT).run()
    .then(function(user) {
      if (user) {

        const comment = req.body.comment;
        const dataId = req.body.postId;
        const email = user.email;

        // Create a new dataComment object
        const newComment = new DataComment({ comment, email });
        // Create association
        newComment.postId = dataId;

        console.log(newComment);
        // Save comment and then get joins for post and send to client
        newComment.save()
          .then(function() {
            Data.get(dataId).getJoin({ comments: true }).run()
              .then(function(data) {
                res.json(data);
              })
              .catch(function(err) {
                console.log(err);
                res.json(err);
              });
          })
          .catch(function (err) {
            console.log('catch error', err);
          });

      } else {
        console.log('could not find user');
        res.send('Unauthorized');
      }
    })
    .catch(function(err) {
      console.log('ERROR', err);
      res.send(err);
    });
};

// GET ALL DATA COMMENTS

exports.getDataComments = function (req, res) {

  const dataId = req.body.postId;

  Data.get(dataId).getJoin().run()
    .then(function(data) {
      res.json(data);
    })
    .catch(function (err) {
      console.log('catch error', err);
      res.send(err);
    });
};

// DELETE DATA COMMENT

exports.deleteDataComment = function (req,res) {

  const commentId = req.body.commentId;

  DataComment.get(commentId).delete()
    .then(function (response) {
      res.send({ server: 'post deleted' })
    })
    .catch(function (err) {
      console.log('catch error', err);
      res.send(err);
    });
};

// ***** VOTES *****

// SET VOTES ON DATA

exports.setDataVotes = function (req, res) {

  const token = req.header('authorization');
  const voterId = jwt.decode(token, config.secret).sub;
  const upVote = req.body.voteType?true:false;
  const dataId = req.body.postId;
  const createdAt = new Date();



  Data.get(dataId).run()
    .then(function(data) {
      const userAlreadyVoted = data.votes.find(function(comment) {
        return comment.voterId === voterId;
      });
      if (userAlreadyVoted) {
        Data.get(dataId).getJoin().run().then(function(result){ res.json(result) });
      } else {
        const newVote = {upVote, createdAt, voterId};

        Data.get(dataId).update({votes: r.row('votes').default([]).append(newVote)}).run()
          .then(function (result) {
            Data.get(dataId).getJoin().run().then(function(result){ res.json(result)})
          })
          .catch(function (err) {
            console.log('catch error', err);
            res.send(err);
          });
      }
    });
};

// FIND USERS AND THEIR VOTES

exports.getUserProfile = function (req, res) {

  const token = req.header('authorization');
  const decodedJWT = jwt.decode(token, config.secret).sub;

  if (req.body.userEmail) {
    User.filter(r.row('email').match(req.body.userEmail)).run()
      .then(function (user) {
        Data.filter(r.row('email').match(user[0].email)).run()
          .then(function (data) {
            user[0].votes = data.map(function (post) {
              return post.votes
            });
            user[0].password = '';
            res.json(user[0]);
          });
      });
  } else {
    User.get(decodedJWT).run()
      .then(function (user) {
        Data.filter(r.row('email').match(user.email)).run()
          .then(function (data) {
            user.votes = data.map(function (post) {
              return post.votes
            });
            user.password = '';
            res.send(user);
          });
      });
  }





};

// UPDATE USER PROFILE

exports.updateUserProfile = function (req, res) {

  const token = req.header('authorization');
  const decodedJWT = jwt.decode(token, config.secret).sub;
  const bio = req.body.bio;

  User.get(decodedJWT).update({bio}).run()
    .then(function (user) {
      Data.filter(r.row('email').match(user.email)).run()
        .then(function(data) {
          user.votes = data.map(function(post) {
            return post.votes
          });
          user.password = '';
          res.send(user);
        });
    });
};