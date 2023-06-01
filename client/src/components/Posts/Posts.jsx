import React from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const { posts } = useSelector((state) => state.posts);

  return (
    <div className="Posts">
      {posts.map((posts, index) => {
        return <Post data={posts} key={index} />;
      })}
    </div>
  );
};

export default Posts;
