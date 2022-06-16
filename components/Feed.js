import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Upload from "./Upload";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useState } from "react";
function Feed() {
  const [userData, setUserData] = useState({})
  const {user}=useContext(AuthContext)
  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
   
  //   const unsub=onSnapshot(doc(db,"users",user.uid),(doc)=>{
  //     setUserData(doc.data())
  //   })
  
  //   return () => {
  //     unsub();
  //   }
  // }, [])
  
  return (
    <div className="feed-container">
      <Navbar userData={userData}/>
      <Upload />
      <div className="videos-container">
        <div className="post-container">
          <video src="https://youtube.com/shorts/2DvJI5dBkYU?" />
          <div className="videos-info">
            <div className="avatar-container">
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/2.jpg"
                sx={{ margin: "0.5rem" }}
              />
              <p>
                  Sahil
              </p>
            </div>
            <div className="post-like">
              <FavoriteIcon fontSize="large" />
              10
            </div>
          </div>
        </div>
        <div className="post-container">
          <video />
        </div>
      </div>
    </div>
  );
}

export default Feed;
