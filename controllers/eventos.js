const Editor = require("../models/editor");

module.exports.showEventos = async (req, res, next) => {
  const isAdminView = !!req.session.admin_id;
  const editor = await Editor.findOne({ kind: "eventos" });
  if (!editor) {
    console.log("Eventos does not exist!");
    // req.flash("error", "Cannot Find Eventos!");
    //have to return here so as not to render show
    return res.redirect("http://localhost:3000/quienes_somos");
  }
  res.send({ editor, isAdminView });
};

module.exports.updateEventos = async (req, res) => {
  console.log("req.body = ", req.body);
  await Editor.updateOne({ kind: "eventos" }, { ...req.body.editor });
  const editor = await Editor.findOne({ kind: "eventos" });
  await editor.save();
  res.send({ editor });
};
