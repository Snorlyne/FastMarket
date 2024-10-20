import React, { useState } from 'react';
import { Avatar, TextField, Button, BottomNavigation, BottomNavigationAction, Box, Typography } from '@mui/material';
import { Delete, PowerSettingsNew, Home, Person } from '@mui/icons-material';
import './perfilView.css'; // Import the CSS file for styling

const Profile: React.FC = () => {
  const [value, setValue] = useState(0); // For bottom navigation

  return (
    <div className="profile-container">
      {/* Profile Avatar and Username */}
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

      {/* Personal Information Form */}
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

      {/* Action Buttons */}
      <div className="profile-actions">
        <Button variant="contained" color="error" startIcon={<Delete />} className="profile-action-btn">
          Eliminar
        </Button>
        <Button variant="contained" color="primary" startIcon={<PowerSettingsNew />} className="profile-action-btn">
          Cerrar sesión
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        className="profile-bottom-nav"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>
    </div>
  );
};

export default Profile;
