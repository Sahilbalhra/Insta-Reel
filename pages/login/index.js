/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
// Next inbuilt Image componenet
import Image from "next/image";
import insta from "../../assets/insta.jpg";
import {
  CarouselProvider,
  Slider,
  Slide,
  Image as Img,
} from "pure-react-carousel";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import { Carousel } from "react-responsive-carousel";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import Link from "next/link";

function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //getting login and user from authWarper
  const { login, user } = useContext(AuthContext);
  //to change the route
  const router = useRouter();

  useEffect(() => {
    // console.log("login aaya");
    if (user?.uid) {
      //   console.log(user);
      //   console.log(user == "");
      //   console.log(user == null);
      //   console.log("user not equal to null");
      //go to feed page
      router.push("/");
    } else {
      console.log("Not logged in");
    }
  }, [router, user]);

  //login btn function
  const handleClick = async () => {
    try {
      setLoading(true);
      setError("");
      //login from useContext(AuthContext)
      //async function
      await login(email, password);

      //   console.log("Logged in!");
    } catch (err) {
      console.log(err);
      setError(err.message);
      //disapear after 2 min.
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="carbg">
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
            <Image src={bg1}></Image>
            <Image src={bg2}></Image>
            <Image src={bg3}></Image>
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

          {error != "" && <div style={{ color: "red" }}>{error}</div>}

          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: "1rem" }}
            onClick={handleClick}
            disabled={loading}
          >
            Login In
          </Button>
          <div style={{ color: "blue", marginTop: "0.5rem" }}>
            <Link href="/forgotpassword" passHref>
              <span style={{ color: "blue", cursor: "pointer" }}>
                Forgot Password ?
              </span>
            </Link>
          </div>
        </div>
        <div className="bottom-card">
          Don&apos;t Have an Account?{" "}
          <Link href="/signup" passHref>
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
