const Editor = require("../models/editor");

module.exports.index = async (req, res, next) => {
  const editors = await Editor.find({});
  const isAdminView = !!req.session.admin_id;
  editors.sort((a, b) => b.date - a.date);
  res.send({ editors, isAdminView });
};

module.exports.showEstudio = async (req, res, next) => {
  const { id } = req.params;
  const isAdminView = !!req.session.admin_id;
  const editor = await Editor.findById(id);
  if (!editor) {
    console.log("Estudio does not exist");
    res.redirect("/estudios");
  }
  res.send({ editor, isAdminView });
};

module.exports.createEstudio = async (req, res, next) => {
  console.log("req.body = ", req.body);
  const myEstudio = new Editor(req.body.editor);
  myEstudio.date = Date();
  await myEstudio.save();
  console.log("Saved: ", myEstudio);
  const id = myEstudio._id;
  res.send({ id });
};

module.exports.updateEstudio = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const estudio = await Editor.findByIdAndUpdate(id, {
    ...req.body.editor,
  });
  await estudio.save();
  res.send({ id });
};

module.exports.deleteEstudio = async (req, res, next) => {
  const response = await Editor.findByIdAndDelete(req.params.id);
  res.send({ response });
};
