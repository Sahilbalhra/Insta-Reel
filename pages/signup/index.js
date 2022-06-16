/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from "react";
import { Button, speedDialActionClasses } from "@mui/material";
import TextField from "@mui/material/TextField";
// Next inbuilt Image
import Image from "next/image";
import insta from "../../assets/insta.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
function Index() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { signup, user } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError("");
      //getting user from auth
      const user = await signup(email, password);
 
      // console.log("Signed Up!");
      //all firebase upload file function see documentation
      //location to store data
      // console.log(user.user.uid);
      const storageRef = ref(storage, `${user.user.uid}/Profile.jpeg`);

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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            //adding doc to the collection
            let obj = {
              name: name,
              email: email,
              uid: user.user.uid,
              photoURL: downloadURL,
              posts:[],
            };
            await setDoc(doc(db, "users", user.user.uid), obj);
            console.log("doc added");
          });
        }
      );
    } catch (err) {
      console.log(err);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      console.log("Not logged in");
    }
  }, [router, user]);

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* basic image use method */}
        <Image src={insta} />
        <TextField
          size="small"
          margin="dense"
          id="outlined-basic"
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          size="small"
          margin="dense"
          id="outlined-basic"
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          size="small"
          margin="dense"
          id="outlined-basic"
          fullWidth
          label="Full Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="outlined"
          fullWidth
          component="label"
          style={{ marginTop: "1rem" }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          Upload
        </Button>
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: "1rem" }}
          onClick={handleClick}
          disabled={loading}
        >
          Sign Up
        </Button>
      </div>
      <div className="signup-card" style={{ marginTop: "1rem" }}>
        Already Have an Account?{" "}
        <Link href="/login" passHref>
          <span style={{ color: "blue", cursor: "pointer" }}>Login</span>
        </Link>
      </div>
    </div>
  );
}

export default Index;
