import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../../img/profileImg.jpg";

import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import axios from "axios";
import { fetchPosts } from "../Posts/viewPostSlice";

const PostShare = () => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const desc = useRef();

  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  useEffect(() => {
    dispatch(fetchPosts(profile.user._id));
  }, [dispatch, profile.user._id]);

  const handlePost = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: profile.user._id,
      desc: desc.current.value,
    };
    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
    }
    try {
      await axios.post("http://localhost:4000/post", newPost);
      // dispatch view post slice with the new post
      dispatch(fetchPosts(profile.user._id));
      // Clear the input field and image
      desc.current.value = "";
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="PostShare">
      <img src={ProfileImage} alt="" />
      <div>
        <input required ref={desc} type="text" placeholder="What's happening" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button onClick={handlePost} className="button ps-button">
            Share
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
