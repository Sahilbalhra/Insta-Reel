import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import insta from "../../assets/insta.jpg";
import { Carousel } from "react-responsive-carousel";

import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import { AuthContext } from "../../context/auth";
// providing routes
import { useRouter } from "next/router";

function index() {
  //providing routes
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // getting login details and user
  const { login, user } = useContext(AuthContext);

  //on click function

  const handleClick = async () => {
    // console.log(email+" "+password);
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      // console.log("User loged in");
    } catch (err) {
      setError(err.message);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    //checking the auth user
    console.log(user);
    if (user) {
      //go to feed page
      router.push("/");
    } else {
      console.log("User not logged in");
    }
  }, [user]);

  return (
    <div className="login-container">
      {/* insta phones images */}
      <div className="carbg">
        {/* images inside phones using pure carousel npm package*/}
        <div className="car">
          <Carousel
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            interval={2000}
            autoPlay={true}
            showArrows={false}
          >
            <Image src={bg1} />
            <Image src={bg2} />
            <Image src={bg3} />
            <Image src={bg4} />
          </Carousel>
        </div>
      </div>
      <div>
        <div className="login-card">
          <Image src={insta} />

          <TextField
            size="small"
            margin="dense"
            id="outlined-basic"
            fullWidth
            label="Email"
            variant="outlined"
            //initial value in pwd
            value={email}
            //getting the change value in the field
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
            //initial value in pwd
            value={password}
            //getting the change value in the field
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* condition on error if error then show else do not show */}
          {error != "" && <div style={{ color: "red" }}>{error}</div>}

          <Button
            variant="contained"
            fullWidth
            component="span"
            style={{ marginTop: "1rem" }}
            //onclick function
            onClick={handleClick}
            disabled={loading}
          >
            LogIn
          </Button>
          <div style={{ color: "blue", marginTop: "0.5rem" }}>
            Forgot Password ?
          </div>
        </div>
        <div className="bottom-card">
          Don't Have an Account ? <span style={{ color: "blue" }}>Sign Up</span>{" "}
        </div>
      </div>
    </div>
  );
}

export default index;
