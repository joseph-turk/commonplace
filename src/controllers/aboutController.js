var aboutController = function() {

  var getIndex = function(req, res) {
        res.render('aboutView', {
          user: req.user
        });
    };

  return {
    getIndex: getIndex
  };
};

module.exports = aboutController;
