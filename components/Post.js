import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../context/auth";
import { useEffect } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Post = ({ postData, userData }) => {
  //   console.log(postData);
  //   console.log(userData);
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (postData.likes.includes(user.uid)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [postData, user.uid]);

  const handleLike=async()=>{
    if(!like){
        await updateDoc(doc(db,"posts",postData.postId),{
            likes:arrayUnion(user.uid)
        })
    }else{
        await updateDoc(doc(db,"posts",postData.postId),{
            likes:arrayRemove(user.uid)
        })
    }
  }

  return (
    <div className="post-container">
      <video src={postData.postUrl} />
      <div className="videos-info">
        <div className="avatar-container">
          <Avatar
            alt="Remy Sharp"
            src={postData.profileUrl}
            sx={{ margin: "0.5rem" }}
          />
          <p style={{ color: "white", fontWeight: "bold" }}>
            {postData.profileName}
          </p>
        </div>
        <div className="post-like">
          <FavoriteIcon
            fontSize="large"
            style={like ? { color: "red",cursor:"pointer" } : { color: "white" ,cursor:"pointer"}}
            onClick={handleLike}
          />
          {postData.likes.length > 0 && postData.likes.length}
        </div>
      </div>
    </div>
  );
};

export default Post;
