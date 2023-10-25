const express = require("express");
const routes = express.Router();
const {
  register,
  login,
  profile,
  logout,
  createNewPost,
  getData,
  getDetailPost,
  updatePost,
} = require("../controller/controler");
require("../database/connect");

const multer = require("multer");
const uploadMidleware = multer({ dest: "uploads/" });

routes.post("/register", register);
routes.post("/login", login);
routes.get("/profile", profile);
routes.post("/logout", logout);
routes.post("/post", uploadMidleware.single("file"), createNewPost);
routes.get("/post", getData);
routes.get("/post/:id", getDetailPost);
routes.put("/post", uploadMidleware.single("file"), updatePost);

module.exports = routes;
