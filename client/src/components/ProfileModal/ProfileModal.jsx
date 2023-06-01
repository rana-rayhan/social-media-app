import { Modal, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../fetures/profileSlice";

function ProfileModal({ modalOpened, setModalOpened }) {
  //
  const theme = useMantineTheme();
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLasttname] = useState("");
  const userId = profile.user._id;

  const updateUser = async (firstname, lastname, userId) => {
    await axios
      .put(`http://localhost:4000/user/${userId}`, {
        firstname,
        lastname,
        userId,
      })
      .then((user) => {
        console.log(user);
        dispatch(fetchUser(user));
      });
  };
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleUpdate = (e) => {
    updateUser(firstname, lastname, userId);
    console.log(firstname, lastname, userId);
    dispatch(fetchUser());
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            className="infoInput"
            name="FirstName"
            placeholder="First Name"
          />

          <input
            value={lastname}
            onChange={(e) => setLasttname(e.target.value)}
            type="text"
            className="infoInput"
            name="LastName"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAT"
            placeholder="Works at"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIN"
            placeholder="LIves in"
          />

          <input
            type="text"
            className="infoInput"
            name="Country"
            placeholder="Country"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
          />
        </div>

        <div>
          Profile Image
          <input type="file" name="profileImg" />
          Cover Image
          <input type="file" name="coverImg" />
        </div>

        <button
          onClick={handleUpdate}
          type="submit"
          className="button infoButton"
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
