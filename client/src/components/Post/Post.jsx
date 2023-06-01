import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector } from "react-redux";

const Post = ({ data }) => {
  const { profile } = useSelector((state) => state.profile);
  const [liked, setLiked] = useState(data.likes.includes(profile.user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [userData, setUserData] = useState(profile.user.firstname);

  const postId = data._id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/${data.userId}`
        );
        const user = response.data;
        setUserData(user);
      } catch (error) {
        console.error("Error while fetching user data:", error);
      }
    };

    fetchUserData();
  }, [data.userId]);

  const handleLike = async () => {
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);

    try {
      await axios.put(`http://localhost:4000/post/${postId}/like`, {
        userId: profile.user._id,
      });

      setLiked((prev) => !prev);
    } catch (error) {
      console.error("Error while updating likes:", error);
    }
  };

  return (
    <div className="Post">
      <img src={data.img} alt="" />

      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" onClick={handleLike} />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{userData.firstname}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
