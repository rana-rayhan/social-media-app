import React, { useEffect, useState } from "react";
import "./FollowersCard.css";

import { Followers } from "../../Data/FollowersData";
import { useSelector } from "react-redux";
import axios from "axios";

const FollowersCard = ({ data }) => {
  const { profile } = useSelector((state) => state.profile);
  const [usersId] = useState(profile.user.followers);
  const [users, setUsers] = useState([]);
  // const [followId, setFollowId] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRequests = usersId.map((id) =>
          axios.get(`http://localhost:4000/user/${id}`)
        );
        const userResponses = await Promise.all(userRequests);
        const fetchedUsers = userResponses.map((response) => response.data);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error while fetching user data:", error);
      }
    };

    fetchUserData();
  }, [usersId]);

  const handleFollow = async (userId) => {
    // setFollowId((prev) => !prev);
    try {
      const response = await axios.put(
        `http://localhost:4000/user/${userId}/follow`,
        {
          currentUserId: profile.user._id,
        }
      );
      const updatedUser = response.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, isFollowed: updatedUser.isFollowed }
            : user
        )
      );
    } catch (error) {
      console.error("Error while updating follow status:", error);
    }
  };

  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>
      {users.map((user) => {
        return (
          <div className="follower" key={user.id}>
            <div>
              {Followers.map((follower) => (
                <img src={follower.img} alt="" className="followerImage" />
              ))}
              <div className="name">
                <span>{user.firstname}</span>
                <span>@{user.username}</span>
              </div>
            </div>
            <button
              className="button fc-button"
              onClick={() => handleFollow(user._id)}
            >
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
