import { db } from "../api/db.js";
import jwt from "jsonwebtoken";
export const getAllPosts = (req, res) => {
  const sql = req.query.cat
    ? /*sql*/ `SELECT * FROM posts WHERE cat = ?`
    : /*sql*/ `SELECT * FROM posts`;
  try {
    db.query(sql, [req.query.cat], (err, data) => {
      if (err) return res.status(200).json(err.message);
      res.status(200).json({
        message: "OK",
        data,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (req, res) => {
  const sql = /*sql*/ `SELECT p.id,username,title,des,img AS userImage ,image ,date,cat FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?`;
  // const sql = /*sql*/ `SELECT * from posts WHERE id = ?`;
  const id = req.params.id;
  try {
    db.query(sql, [id], (err, row) => {
      if (err) return res.status(200).json(err.message);
      if (row.length === 0) return res.status(404).json("Post Not Found!");
      res.status(200).json(row);
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authonticated");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Error creating a new post.");
    }

    const sql = /*sql*/ `INSERT INTO posts (title, des, date, image, cat, uid) VALUES (?,?,?,?,?,?)`;
    const { title, des, date, image, cat } = req.body;
    // TODO: Add validation for required fields
    if (!title) return res.status(500).json("Title Field Is Required!");
    if (!des) return res.status(500).json("Description Field Is Required!");
    const params = [title, des, date, image, cat, userInfo.id];
    try {
      db.query(sql, [...params], (err, result) => {
        if (err) return res.status(500).json({ errror: err.message });
        res.status(200).json({
          message: "Create Post Successfully!",
          title,
          des,
          date,
          image,
          cat,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("An error occurred.");
    }
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Error creating a new post.");
    }
    const postID = req.params.id;
    const { title, des, cat, image } = req.body;

    // TODO: Validate the input fields
    if (!title) return res.status(500).json("Title field is required!");
    if (!des) return res.status(500).json("Description field is required!");

    const sql = /*sql*/ `UPDATE posts SET title = ?, des = ?, cat = ?, image = ? WHERE id = ? AND uid = ?`;
    const params = [title, des, cat, image, postID, userInfo.id];

    try {
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err.message);
        }

        if (result.affectedRows === 0) {
          return res.status(404).json("Post not found or unauthorized access.");
        }

        res.status(200).json({
          message: "Post updated successfully!",
          title,
          des,
          cat,
          image,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Error updating the post.");
    }
  });
};

export const deletePost = (req, res) => {
  const sql = /*sql*/ `DELETE FROM posts WHERE id = ?`;
  const id = req.params.id;
  try {
    db.query(sql, [id], (err, row) => {
      if (err) return res.status(200).json(err.message);
      if (row.length === 0) return res.status(404).json("Post Not Found!");

      res.status(200).json({
        message: "Delete Post Cuccessfully!",
        title: req.body.title,
        des: req.body.des,
        date: req.body.date,
        image: req.body.image,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
