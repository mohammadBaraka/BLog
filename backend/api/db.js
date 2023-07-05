import mysql from "mysql";
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog",
});
try {
  db;
  console.log("Connect");
} catch (error) {
  console.log(error);
}
