const Authentication = require('./controllers/authentication');
const SearchData = require('./controllers/search_data');
const passportService = require('./services/passport');
const passport = require('passport');

// Use the passport authenticate by jwt service
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'API TOKEN VALID'});
  });
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/datasave', requireAuth, SearchData.setData);
  app.post('/datasearch', requireAuth, SearchData.getData);
  app.post('/datadelete', requireAuth, SearchData.deleteData);
  app.post('/dataupdate', requireAuth, SearchData.updateData);
  app.post('/datacommentsave', requireAuth, SearchData.setDataComment);
  app.post('/datacommentget', requireAuth, SearchData.getDataComments);
  app.post('/datacommentdelete', requireAuth, SearchData.deleteDataComment);
  app.post('/datavote', requireAuth, SearchData.setDataVotes);
  app.post('/getuserprofile', requireAuth, SearchData.getUserProfile);
  app.post('/updateuserprofile', requireAuth, SearchData.updateUserProfile);
};
