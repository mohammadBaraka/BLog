import React, { useContext, useEffect, useState } from "react";
import "./Single.css";
import Blog from "../../images/blog.jpg";
import User from "../../images/user.jpg";
import Edit from "../../images/edit.png";
import Delete from "../../images/delete.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import axios from "axios";
import Swal from "sweetalert2";
import { ContextApi } from "../../context/AuthContext";

function Single() {
  const { currentUser } = useContext(ContextApi);
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDelete = (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/posts/${id}`);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Post Has Been Deleted!",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        console.log(res.data[0]);
        setPost(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="single">
      <div className="content-user" key={post.id}>
        {post.image ? (
          <img src={`../upload/${post.image}`} alt="blog" />
        ) : (
          <img src={Blog} alt="blog" />
        )}
        <div className="user">
          {post.img ? post.img : <img src={User} alt="user" />}
          <div className="info">
            <span style={{ textTransform: "capitalize" }}>{post.username}</span>
            <p>
              <b>Created At:</b> {post.date}
            </p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${id}`} state={post}>
                <img src={Edit} alt="edit" title="Edit" />
              </Link>

              <img
                onClick={handleDelete}
                src={Delete}
                alt="edit"
                title="Delete"
              />
            </div>
          )}
        </div>

        <h1>{post.title}</h1>
        {getText(post.des)}
      </div>
      <div className="menu">
        <Menu cat={post.cat} />
      </div>
    </div>
  );
}

export default Single;
