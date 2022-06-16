/* eslint-disable react/jsx-key */
import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import { AuthContext } from "../context/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ProfileComp = () => {
  const [userData, setUserData] = useState({});
  const { user } = useContext(AuthContext);
  const [postIds, setPostIds] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // console.log(user.uid);
    //firebase function to get doc  data
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      // console.log(doc.data());
      setUserData(doc.data());
      setPostIds(doc.data().posts);
    });
    //clean up function
    return () => {
      unsub();
    };
  }, [user]);

  useEffect(() => {
    //firebase function to get doc  data
    let tempArray = [];
    postIds.map(async (postid, idx) => {
      const unsub = onSnapshot(doc(db, "posts", postid), (doc) => {
        tempArray.push(doc.data());
        console.log(tempArray);
        setPosts([...tempArray]);
      });
    });
  }, [postIds]);

  return (
    <>
      <Navbar userData={userData} />
      <div>
        <div className="profile_upper">
          <Box
            component="img"
            src={userData?.photoURL}
            alt=""
            style={{ height: "8rem", width: "8rem", borderRadius: "50%" }}
          />
          <div style={{ flexBasis: "40%" }}>
            <h1>{userData?.name}</h1>
            <h3>Posts : {userData?.posts?.length}</h3>
          </div>
        </div>
        <hr />
        <div className="profile_videos">
          {
            posts.map((post)=>(
              <video src={post.postUrl}></video>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default ProfileComp;
