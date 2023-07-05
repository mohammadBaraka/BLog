import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import moment from "moment";
import "react-quill/dist/quill.snow.css";
import "./Write.css";
import { useLocation } from "react-router-dom";
function Write() {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.des || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState("");
  const [cat, setCat] = useState(state?.cat || "");
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await upload();
    try {
      const res = state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            des: value,
            cat,
            image: file ? imageUrl : "",
          })
        : await axios.post("/posts/", {
            title,
            des: value,
            cat,
            image: file ? imageUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-write">
      <div className="content-write">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor-container">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu-write">
        <div className="item">
          {state === null ? (
            <div>
              <h1>Publish</h1>
              <span>
                <b>Visibility :</b>Publish
              </span>
            </div>
          ) : (
            <div>
              <h1>Update</h1>
              <span>
                <b>Visibility :</b>Update
              </span>
            </div>
          )}
          <span>
            <b>Visibility :</b>Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="upload" htmlFor="file">
            Upload
          </label>
          {state === null ? (
            <div className="buttons">
              <button>Save As Draft</button>
              <button onClick={handleSubmit}>Publish</button>
            </div>
          ) : (
            <div className="buttons">
              <button>Save As Draft</button>
              <button onClick={handleSubmit}>Update</button>
            </div>
          )}
        </div>

        <div className="item">
          <h1>Ctegories</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "scinse"}
              name="cat"
              value="scinse"
              id="scinse"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="scinse">Scinse</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinem"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="cinem">Cinem</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "disign"}
              name="cat"
              value="disign"
              id="disign"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="disign">Disign</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="food">Food</label>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
