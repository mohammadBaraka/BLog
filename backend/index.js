import express from "express";
// import cors from "cors";
import postRouter from "./routes/posts.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";
const app = express();
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.json());
// app.use(cors());
//? *********************UPLOAD AN IMAGE**************************

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json("No file uploaded.");
    }

    console.log(file);
    res.status(200).json(file.filename);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error uploading the file.");
  }
});

//? *********************//UPLOAD AN IMAGE\\**************************
// //?\\============Controller//==========
app.use("/api/", postRouter);
app.use("/api/", usersRouter);
app.use("/api/", authRouter);
// //?\\============Controller//===========

app.get("/test", (req, res) => {
  res.send("It WOrks");
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server Running On http://localhost:${port}`);
});
