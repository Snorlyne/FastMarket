import React, { useState, useCallback, lazy, Suspense } from 'react'; 
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box, useMediaQuery } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTheme } from '@mui/material/styles';

import Sidebar from './SIdebar'; 

const Menu = lazy(() => import('@mui/material/Menu'));
const MenuItem = lazy(() => import('@mui/material/MenuItem'));

const Header: React.FC = React.memo(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleFilterClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const searchBarWidth = isMobile ? '250px' : '600px';

  const toggleSidebar = (open: boolean) => () => {
    setIsSidebarOpen(open);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <AppBar position="static" sx={{ backgroundColor: '#2E8B57', padding: '3px' }} elevation={0}>
        <Toolbar sx={{ justifyContent: isMobile ? 'space-between' : 'center' }}>
          {isMobile && (
            <IconButton onClick={toggleSidebar(true)} sx={{ color: '#FFFFFF' }}>
              <i className="fa-solid fa-bars"></i>
            </IconButton>
          )}

          <Box
            display="flex"
            alignItems="center"
            sx={{ 
              width: '100%', 
              maxWidth: '900px', 
              justifyContent: 'center', 
              gap: '20px',
            }} 
          >
            {!isMobile && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: '#FFFFFF', fontWeight: 'bold' }} 
              >
                FastMarket
              </Typography>
            )}

            <Box
              sx={{
                position: 'relative',
                borderRadius: '20px', 
                backgroundColor: '#ffffff', 
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: searchBarWidth,
                padding: '5px 10px', 
              }}
            >
              <Box sx={{ padding: '0 10px', display: 'flex', alignItems: 'center', color: '#2E8B57' }}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Box>
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ color: '#2E8B57', flexGrow: 1 }} 
              />
              <IconButton onClick={handleFilterClick}>
                <FilterListIcon sx={{ color: '#2E8B57' }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>

        <Suspense fallback={null}>
          {open && (
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'filter-button',
              }}
            >
              <MenuItem onClick={handleClose}>Filtro 1</MenuItem>
              <MenuItem onClick={handleClose}>Filtro 2</MenuItem>
              <MenuItem onClick={handleClose}>Filtro 3</MenuItem>
            </Menu>
          )}
        </Suspense>
      </AppBar>
    </>
  );
});

export default Header;
