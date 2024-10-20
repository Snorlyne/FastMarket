import React, { useState } from 'react';
import { Avatar, TextField, Button, BottomNavigation, BottomNavigationAction, Box, Typography } from '@mui/material';
import './CSS/perfil.css'; 

const ProfilePage: React.FC = () => {
  const [value, setValue] = useState(0); 

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Avatar
          alt="Profile Picture"
          src="https://example.com/profile-pic.jpg"
          className="profile-avatar"
        />
        <Typography variant="h6" className="profile-username">
          usuario: LianG17
        </Typography>
      </div>

      <div className="profile-info">
        <TextField
          label="Nombre"
          value="Lian Erick"
          fullWidth
          InputProps={{ readOnly: true }}
          variant="outlined"
          margin="normal"
          className="profile-input"
        />
        <TextField
          label="Apellidos"
          value="Aguirre Sierra"
          fullWidth
          InputProps={{ readOnly: true }}
          variant="outlined"
          margin="normal"
          className="profile-input"
        />
        <TextField
          label="Correo"
          value="LianG16@gmail.com"
          fullWidth
          InputProps={{ readOnly: true }}
          variant="outlined"
          margin="normal"
          className="profile-input"
        />
        <TextField
          label="Número"
          value="9983392738"
          fullWidth
          InputProps={{ readOnly: true }}
          variant="outlined"
          margin="normal"
          className="profile-input"
        />
      </div>

      <div className="profile-actions">
        <Button variant="contained" color="error" startIcon={<i className="fa-solid fa-trash"></i>} className="profile-action-btn">
          Eliminar
        </Button>
        <Button variant="contained" color="primary" startIcon={<i className="fa-solid fa-power-off"></i>} className="profile-action-btn">
          Cerrar sesión
        </Button>
      </div>

 
    </div>
  );
};

export default ProfilePage;
