const Editor = require("./models/editor");

module.exports.showCreencias = async (req, res, next) => {
  const isAdminView = !!req.session.admin_id;
  const editor = await Editor.findOne({ kind: "creencias" });
  if (!editor) {
    console.log("Creencias does not exist!");
    return res.redirect("/quienes_somos");
  }
  res.send({ editor, isAdminView });
};

module.exports.updateCreencias = async (req, res) => {
  console.log("req.body = ", req.body);
  const editor = await Editor.updateOne(
    { kind: "creencias" },
    { ...req.body.editor }
  );
  await editor.save();
  res.send({ editor });
};
