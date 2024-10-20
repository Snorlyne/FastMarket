import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem, IconButton, Link } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory } from 'react-router-dom';

const Menubelow = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const history = useHistory();

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ display: { xs: 'none', md: 'block' } }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ flexGrow: 1 }}>
          <Link href="/dashboard" underline="none" sx={{ margin: '0 20px', color: 'black' }}>
            <Typography variant="body1">Dashboard</Typography>
          </Link>
          <Link href="/ofertas" underline="none" sx={{ margin: '0 20px', color: 'black' }}>
            <Typography variant="body1">Ofertas</Typography>
          </Link>
          <Link href="/Mysale" underline="none" sx={{ margin: '0 20px', color: 'black' }}>
            <Typography variant="body1">Mis Ventas</Typography>
          </Link>
        </Box>

        <Box display="flex" alignItems="center">
          <Avatar alt="Roger" src="https://via.placeholder.com/150" />
          <Box ml={1} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="body1" sx={{ margin: 0, color: 'black' }}>Roger</Typography>
            <Typography variant="body2" sx={{ margin: 0, color: 'black' }}>Rogelio39@gmail.com</Typography>
          </Box>
          <IconButton onClick={handleMenuOpen} sx={{ marginLeft: '10px' }} aria-controls={open ? 'menu-appbar' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                marginTop: '40px',
              },
            }}
          >
            <MenuItem onClick={() => history.push('/VIewPerfil')}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Menubelow;
