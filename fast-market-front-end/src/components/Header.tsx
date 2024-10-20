import React from 'react';
import { AppBar, Toolbar, TextField, IconButton, InputAdornment } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';
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
                  <SearchIcon className="search-icon" />
                </InputAdornment>
              ),
              className: "search-input",
            }}
          />
          <IconButton className="filter-button">
            <FilterIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
