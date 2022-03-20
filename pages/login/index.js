import React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import insta from "../../assets/insta.jpg";
import { Carousel } from "react-responsive-carousel";

import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";

function index() {
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
          />
          <TextField
            size="small"
            margin="dense"
            id="outlined-basic"
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
          />
          <div style={{ color: "red" }}>Error</div>
          <Button
            variant="contained"
            fullWidth
            component="span"
            style={{ marginTop: "1rem" }}
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
