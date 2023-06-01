import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../fetures/profileSlice";
import axios from "axios";

const ProfileCard = () => {
  const { profile } = useSelector((state) => state.profile);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [user, setUser] = useState(profile.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/${profile.user._id}`
        );
        const user = response.data;
        setUser(user);
        dispatch(fetchUser(user));
      } catch (error) {
        console.error("Error while fetching user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch, profile.user._id]);

  const ProfilePage = true;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="ProfileName">
        {profile ? (
          <span>
            <Link to="/profile">
              {user.firstname} {user.lastname}
            </Link>
          </span>
        ) : (
          <span>Test User</span>
        )}
        <span></span>
        <span>Senior UI/UX Designer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;
