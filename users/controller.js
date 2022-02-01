const pool = require("../db");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const { password, rows } = require("pg/lib/defaults");
const jwt = require("jsonwebtoken");
const { jwtTokens } = require("../utils/jwt-helper");
const router = require("./routes");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      queries.addUser,
      [username, hashedPassword],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("user added");
      }
    );
  } catch {
    res.status(500).send("cannot add");
  }
};

const getUserByUsername = (req, res) => {
  const username = req.params.username;
  pool.query(queries.getUserByUsername, [username], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const removeUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send("User does not exist in database.");
    }

    pool.query(queries.removeUser, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("User removed successfully");
    });
  });
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await pool.query(queries.getUserByUsername, [username]);
    if (users.rows.length === 0)
      return res.status(401).json({ error: "username is incorrect" });
    //password check
    const validPassword = await bcrypt.compare(
      password,
      users.rows[0].password
    );
    if (!validPassword)
      return res.status(401).json({ error: "incorrect password" });
    
    // JWT
    let tokens = jwtTokens(users.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken === null)
      return res.status(401).json({ error: "null refresh token" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens(user);
        res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const deleteRefresh = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "refresh token deleted." });
  } catch {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  addUser,
  removeUser,
  loginUser,
  getUserByUsername,
  refreshToken,
  deleteRefresh,
};
