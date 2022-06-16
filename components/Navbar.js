/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import insta from "../assets/insta.jpg";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import { AuthContext } from "../context/auth";
import { Router, useRouter } from "next/router";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

const Navbar = ({ userData }) => {
  //adding logout functionality
  const { logout } = React.useContext(AuthContext);
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    await logout();
    // console.log("Logged out!");
    router.push("/login");
  };
  const profileClick = () => {
    router.push("/profile");
  };
  const logoClick = () => {
    router.push("/");
  };

  return (
    <AppBar position="static" color="transparent" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ cursor: "pointer" }}>
            <Image src={insta} height={55} width={300} onClick={logoClick} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }} className="nav-icons-container">
            {/* apply home icon */}
            <HomeIcon fontSize="large" className="nav-icons" />
            {/* appling explore icon */}
            <ExploreIcon fontSize="large" className="nav-icons" />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={userData?.photoURL}
                  sx={{ margin: "0.5rem" }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={profileClick}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                }}
              >
                <Typography textAlign="center">logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
