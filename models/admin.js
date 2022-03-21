const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Es necesario poner nombre de usuario!"],
  },
  password: {
    type: String,
    required: [true, "Es necesario poner clave!"],
  },
});

//adds methods to User class
adminSchema.statics.findAndValidate = async function (username, password) {
  const foundAdmin = await this.findOne({ username });
  const isValid = await bcrypt.compare(password, foundAdmin.password);
  //if valid return user object as we will need it, if not just return false
  return isValid ? foundAdmin : false;
};

//pre save middleware, (next here = save())
//only hash on pre save if it has been modified
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
