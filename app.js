require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongo");
const ExpressError = require("./utils/ExpressError");
const path = require("path");
const routes = require("./routes/routes");
const Admin = require("./models/admin");
const port = 5000;
const DB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : "mongodb://localhost:27017/iglesiasinai";
const SECRET = process.env.SECRET;
const ADMIN_NAME = process.env.ADMIN_NAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
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

//so that it can parse requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//before the session config we need to do this
// so we can use mongo to store the session
const store = MongoDBStore.create({
  mongoUrl: DB_URL,
  //this will limit the resaves on the session so
  //if the data is still the same it wil not automatically resave
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: SECRET,
  },
});

//option to look for errors in session store
store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

//session middleware
const sessionConfig = {
  store, //this is the mongo session store above
  name: "session",
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}; //session
app.use(session(sessionConfig));

app.use(routes);

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.all() is for every request and '*' is for every single path
// this needs to be down here so as it catches whatever is left
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
