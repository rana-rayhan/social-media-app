import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersCard from "./FollowersCard";

import { Followers } from "../../Data/FollowersData";
import { useSelector } from "react-redux";
import axios from "axios";

const FollowersCards = () => {
  const { profile } = useSelector((state) => state.profile);
  const [usersId] = useState(profile.user.followers);
  const [users, setUsers] = useState([]);
  console.log("users");
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

  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>
      {users.map((user) => {
        return (
          <div className="follower" key={user.id}>
            <FollowersCard data={user} />

            <div>
              {Followers.map((follower) => (
                <img src={follower.img} alt="" className="followerImage" />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCards;
