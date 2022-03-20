import React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import insta from "../../assets/insta.jpg";

function index() {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <Image src={insta} />
        <TextField
          size="small"
          margin="dense"
          id="outlined-basic"
          fullWidth
          label="User Name"
          variant="outlined"
        />
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
        <Button
          variant="outlined"
          fullWidth
          component="label"
          style={{ marginTop: "1rem" }}
        >
          <input type="file" accept="image/*" style={{ display: "none" }} />
          Upload
        </Button>
        <Button
          variant="contained"
          fullWidth
          component="span"
          style={{ marginTop: "1rem" }}
        >
          Sign Up
        </Button>
      </div>
      <div className="bottom-card">Already Have an Account ? <span style={{color:'blue'}}>Login</span> </div>
    </div>
  );
}

export default index;
