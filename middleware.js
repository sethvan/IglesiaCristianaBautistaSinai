const Editor = require("./models/editor");

module.exports.requireLogin = (req, res, next) => {
  if (!req.session.admin_id) {
    return res.redirect("/admin");
  }
  next();
};
