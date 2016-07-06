var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userModel');

module.exports = function() {
  passport.use(new GoogleStrategy({
    clientID: '276251772063-si0ejj909t4eb2n5f0gs79nqlnjm5kif.apps.googleusercontent.com',
    clientSecret: 'd2HrIcwAx42qdb6zNd00UNNp',
    callbackURL: '/auth/google/callback'},
    function(req, accessToken, refreshToken, profile, done) {
      var user = {};

      var query = {
        'google.id': profile.id
      };

      User.findOne(query, function(err, user) {
        if (user) {
          console.log('found');
          done(null, user);
        } else {
          console.log('not found');
          var user = new User;

          user.email = profile.emails[0].value;
          user.image = profile._json.image.url;
          user.displayName = profile.displayName;

          user.google = {};
          user.google.id = profile.id;
          user.google.token = accessToken;

          user.save();
          done(null, user);
        }
      });
    }
  ));
};
