import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Upload from "./Upload";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useState } from "react";
import Post from "./Post";
function Feed() {
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // console.log(user.uid);
    //firebase function to get doc  data
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      // console.log(doc.data());
      setUserData(doc.data());
    });
    //clean up function
    return () => {
      unsub();
    };
  }, [user]);

  useEffect(() => {
    //firebase function to get doc  data
    const unsub = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        let tempArray = [];
        snapshot.docs.map((doc) => {
          tempArray.push(doc.data());
        });
        setPosts([...tempArray]);
        console.log(tempArray);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="feed-container">
      <Navbar userData={userData} />
      <Upload userData={userData} />
      <div className="videos-container">
        {posts.map((post) => (
          <Post postData={post} userData={userData} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
