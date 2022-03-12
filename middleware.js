const Editor = require("./models/editor");

module.exports.requireLogin = (req, res, next) => {
  if (!req.session.admin_id) {
    return res.redirect("/admin");
  }
  next();
};

module.exports.isDeletable = async (req, res, next) => {
  const deletableKinds = ["estudios", "sermones"];
  const editor = await Editor.findById(req.params.id);
  if (!deletableKinds.includes(editor.kind)) {
    console.log("That editor kind is not deletable!");
    return res.redirect("/");
  }
  next();
};
