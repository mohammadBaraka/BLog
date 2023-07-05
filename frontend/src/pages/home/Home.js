import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Blog from "../../images/blog.jpg";
function Home() {
  const cat = useLocation().search;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [cat]);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div key={post.id} className="post">
              <div className="img">
                {post.image ? (
                  <img
                    className="img"
                    src={`./upload/${post.image}`}
                    alt={post.title}
                  />
                ) : (
                  <img className="img" src={Blog} alt={post.title} />
                )}
              </div>

              <div className="content">
                <h1>{post.title}</h1>
                <p>{getText(post.des.slice(0, 255))}......</p>
                <Link className="btn" to={`/post/${post.id}`}>
                  Read More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
