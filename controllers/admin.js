const Admin = require("../models/admin");

module.exports.login = async (req, res) => {
  let isAdminView = false;
  const { password } = req.body;
  const foundAdmin = await Admin.findAndValidate(
    process.env.ADMIN_NAME,
    password
  );
  if (foundAdmin) {
    req.session.admin_id = foundAdmin._id;
    isAdminView = true;
    res.send({ isAdminView });
  } else {
    res.send({ isAdminView });
  }
};

module.exports.logout = (req, res) => {
  req.session.admin_id = null;
  const isAdminView = false;
  res.send({ isAdminView });
};
