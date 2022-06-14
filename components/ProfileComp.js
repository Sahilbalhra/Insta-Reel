import React from "react";
import Navbar from "./Navbar";

const ProfileComp = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className="profile_upper">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu0RNxKyUbF0fK26BXX_KxP7Y-HWxU_3svFQ&usqp=CAU"
            alt=""
            style={{ height: "8rem", width: "8rem", borderRadius: "50%" }}
          />
          <div style={{ flexBasis: "40%" }}>
            <h1>Name</h1>
            <h3>Posts:3</h3>
          </div>
        </div>
        <hr />
        <div className="profile_videos">
            <video src="https://youtube.com/shorts/QukEa9H7WH8?feature=share"></video>
            <video src="https://youtube.com/shorts/QukEa9H7WH8?feature=share"></video>
            <video src="https://youtube.com/shorts/QukEa9H7WH8?feature=share"></video>
        </div>
      </div>
    </>
  );
};

export default ProfileComp;
