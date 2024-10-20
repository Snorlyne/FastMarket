import React from 'react';
import { AppBar, Toolbar, TextField, IconButton, InputAdornment } from '@mui/material';
import './CSS/Header.css'; 

const Header: React.FC = () => {
  return (
    <AppBar position="static" className="custom-header" sx={{  backgroundColor: '#2E8B57' }}>
      <Toolbar className="custom-toolbar">
        <div className="search-bar">
          <TextField
            variant="standard"
            placeholder="Search"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </InputAdornment>
              ),
              className: "search-input",
            }}
          />
          <IconButton className="filter-button">
          <i className="fa-solid fa-sort-down"></i>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
