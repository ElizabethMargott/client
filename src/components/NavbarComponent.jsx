import { useState, useEffect } from 'react';
import { getAvatarData } from '../api/users.api';
import { Avatar } from "@mui/material";
import {
  Search as SearchIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavbarComponent() {
  const [avatarData, setAvatarData] = useState(null);

  useEffect(() => {
    async function loadAvatar() {
        try {
            const data = await getAvatarData();
            setAvatarData(data);
        } catch (error) {
            console.error('Error al obtener el avatar:', error);
        }
    }
    loadAvatar();
}, []);

  return (
    <Navbar
      className="header"
      style={{ backgroundColor: "#1976D2" }}
      variant="dark"
    >
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Navbar.Brand
          as={Link}
          to="/notes"
          className="brand-style"
          style={{ marginLeft: "20px" }}
        >
          NoteNexus
        </Navbar.Brand>
      </div>
      <Nav className="align-center">
        <Nav.Link as={Link} className="icon-container-navbar" to="#"> 
          <ViewModuleIcon fontSize="large" />
        </Nav.Link>
        <Nav.Link as={Link} className="icon-container-navbar" to="#"> 
          <SearchIcon fontSize="large" />
        </Nav.Link>
        <Nav.Link as={Link} to="/profile">
          <Avatar
            src={URL.createObjectURL(new Blob([avatarData], { type: 'image/jpeg' }))}
            alt="Avatar"
            style={{ marginRight: "10px" }}
          />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
