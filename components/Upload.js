import React, { useState } from "react";
import Button from "@mui/material/Button";
import { storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
//uuid package
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { arrayUnion, serverTimestamp, updateDoc } from "firebase/firestore";
function Upload({ userData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file == null) {
      setError("Please Select a file");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if ((file.size / 1024) * 1024 < 50) {
      setError("Please Select a smaller file then 50");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    //creating our own uid
    let uid = uuidv4();
    
    setLoading(true);

    //work of upload file
    const storageRef = ref(storage, `${userData.uid}/posts/${uid}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //progess bar value
        setProgress(prog);
        console.log("Upload is " + prog + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);

          //adding doc to the collection
          let obj = {
            likes: [],
            postId: uid,
            postUrl: downloadURL,
            profileName: userData.name,
            profileUrl: userData.photoURL,
            uid: userData.uid,
            timestamp: serverTimestamp(),
          };
          console.log(obj);
          //firestore
          await setDoc(doc(db, "posts", uid), obj);

          console.log("post added in post collection");
          //updating the posts array
          await updateDoc(doc(db, "users", userData.uid), {
            //arraygUnion fireStore
            posts: arrayUnion(uid),
          });
        });
      }
    );
    setLoading(false);
  };

  return (
    <div className="upload-btn">
      {error != "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          component="label"
          startIcon={<MovieIcon />}
          style={{ marginTop: "1rem" }}
        >
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          Upload
        </Button>
      )}
      {loading == true && (
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ marginTop: "0.2rem" }}
        />
      )}
    </div>
  );
}

export default Upload;
