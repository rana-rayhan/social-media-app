import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { profile } = useSelector((state) => state.profile);
  const [user, setUser] = useState(profile.user);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/${profile.user._id}`
        );
        const user = response.data;
        setUser(user);
      } catch (error) {
        console.error("Error while fetching user data:", error);
      }
    };

    fetchUserData();
  }, [profile.user._id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    navigate("/auth");
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{user.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>First Name </b>
        </span>
        <span>{user.firstname}</span>
      </div>

      <div className="info">
        <span>
          <b>Last Name </b>
        </span>
        <span>{user.lastname}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{user.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{user.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
