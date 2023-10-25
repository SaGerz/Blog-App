const userModels = require("../models/users");
const postModels = require("../models/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const salt = bcrypt.genSaltSync(10);

const secret = "khsda929ukljd0sau0ajdjasu0sa129";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const response = await userModels.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const response = await userModels.findOne({ username });
  const checkPassword = bcrypt.compareSync(password, response.password);
  if (checkPassword) {
    jwt.sign({ username, id: response._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: response._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
};

const profile = async (req, res) => {
  const { token } = req.cookies;
  try {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const logout = async (req, res) => {
  res.cookie("token", "").json("ok");
};

const createNewPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const response = await postModels.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(response);
  });
};

const getData = async (req, res) => {
  res.json(
    await postModels
      .find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
};

const getDetailPost = async (req, res) => {
  const { id } = req.params;
  const response = await postModels
    .findById(id)
    .populate("author", ["username"]);
  res.json(response);
};

const updatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await postModels.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json({ msg: "You are not an Author" });
    }

    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
};

module.exports = {
  register,
  login,
  profile,
  logout,
  createNewPost,
  getData,
  getDetailPost,
  updatePost,
};
