import React, { useEffect, useState } from "react";
import Blog from "../../images/blog.jpg";
import "./Menu.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        console.log(res.data.data);
        setPosts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [cat]);

  return (
    <div className="menu">
      <h1 className="title">Other Post You May Like!</h1>
      {posts.map((post) => {
        return (
          <div key={post.id} className="post-menu">
            <img
              src={post.image ? `../upload/${post.image}` : Blog}
              alt={post.title}
            />
            <h2>{post.title}</h2>
            <Link className="btn" to={`/post/${post.id}`}>
              Read More
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
