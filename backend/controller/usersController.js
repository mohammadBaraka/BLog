import { db } from "../api/db.js";
import bcrypt from "bcryptjs";

//? *********************_GET ALL USERS_*********************

export const users = (req, res) => {
  const sql = /*sql*/ `SELECT * FROM users`;
  try {
    db.query(sql, [], (err, rows) => {
      if (err) return res.status(500).json(err);
      if (err) return res.status(404).json(err);
      return res.status(200).json(rows);
    });
  } catch (error) {
    console.log(error);
  }
};

//? *********************_FIND USER BY ID_*********************

// export const findUser = (req, res) => {
//   // const sql = /*sql*/ `SELECT * FROM users WHERE id = ?`;
//   const sql = /*sql*/ `SELECT * FROM users u JOIN posts p on u.id=p.uid WHERE u.id = ?;`;

//   const id = req.params.id;
//   try {
//     db.query(sql, [id], (err, row) => {
//       if (err) return res.status(500).json(err);
//       if (row.length === 0) return res.status(404).json("User Not Found!");
//       return res.status(200).json(row);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const findUser = (req, res) => {
  const sql = /*sql*/ `SELECT * FROM users u JOIN posts p on u.id=p.uid WHERE u.id = ?;`;
  const id = req.params.id;

  try {
    db.query(sql, [id], (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length === 0) return res.status(404).json("User Not Found!");

      // Extract user information from the first row
      const user = {
        id: rows[0].id,
        username: rows[0].username,
        // Include any other user properties you want
      };

      // Extract posts information from all rows
      const posts = rows.map((row) => {
        return {
          postId: row.id,
          postTitle: row.title,
          desc: row.des,
          date: row.date,
          imgPost: row.image,
          cat: row.cat,
          // Include any other post properties you want
        };
      });

      // Create a response object with user and posts arrays
      const response = {
        user,
        posts,
      };

      return res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
  }
};

//? *********************_UPDATE USER_*********************
export const updateUser = (req, res) => {
  const sql = /*sql*/ `UPDATE users SET username=?,email=?,password=? WHERE id =?`;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const params = [req.body.username, req.body.email, hash, req.params.id];

  try {
    db.query(sql, params, (err, row) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: "Update User Successfully", row });
    });
    console.log(error);
  } catch (error) {}
};
