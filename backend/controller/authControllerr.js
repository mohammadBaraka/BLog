import { db } from "../api/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const regester = (req, res) => {
  const sql = /*sql*/ `SELECT * FROM users WHERE email = ? OR username = ? `;

  try {
    db.query(sql, [req.body.email, req.body.username], (err, data) => {
      // ? *************//VALIDATE\\***********************
      if (!req.body.username)
        return res.status(409).json("User Faild Is Required!");
      if (!req.body.email)
        return res.status(409).json("Email Faild Is Required!");
      if (!req.body.password)
        return res.status(409).json("Password Faild Is Required!");
      // ? *************//VALIDATE\\***********************
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("User Already Exists");
      // ? ***** HAsh a Password ******
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const sql = /*sql*/ `INSERT INTO users (username,email,password) VALUES (?)`;
      const values = [req.body.username, req.body.email, hash];

      db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        res.status(200).json({
          message: "User Created Successfully!",
          data,
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {
  const sql = /*sql*/ `SELECT * FROM users WHERE username = ?`;
  try {
    db.query(sql, [req.body.username], (err, data) => {
      // ? *************//VALIDATE\\***********************
      if (!req.body.username)
        return res.status(409).json("User Faild Is Required!");
      if (!req.body.password)
        return res.status(409).json("Password Faild Is Required!");
      // ? *************//VALIDATE\\***********************
      //? Handle query errors
      if (err) return res.status(500).json("Internal Server Error");

      //? Check if user exists
      if (data.length === 0) return res.status(400).json("User Not Found!");

      // Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json("Wrong Username or Password!");
      }
      // Generate token
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      // Remove sensitive data from user object

      const { password, ...userWithoutPassword } = data[0];
      // Send token and user details in response
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(userWithoutPassword);
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User Has Loged Out");
};
