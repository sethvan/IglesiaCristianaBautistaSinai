const ADMIN_NAME = process.env.ADMIN_NAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const Admin = require("./models/admin");

const registerAdmin = async (username, password) => {
  const admin = new Admin({
    username,
    password,
  });
  await admin.save();
  //req.session.admin_id = admin._id;
};

// set admin if not set
//registerAdmin(ADMIN_NAME, ADMIN_PASSWORD);
