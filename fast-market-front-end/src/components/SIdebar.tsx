// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box, Typography } from '@mui/material';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: (open: boolean) => () => void;
  }
  
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {

  return (
    <>
   
   <Drawer anchor="left" open={isOpen} onClose={toggleSidebar(false)}>
   <Box sx={{ width: 250 }} role="presentation" onClick={toggleSidebar(false)}>
          <List>
            <ListItem component="a" href="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component="a" href="/ofertas">
              <ListItemText primary="Ofertas" />
            </ListItem>
            <ListItem component="a" href="/mis-ventas">
              <ListItemText primary="Mis Ventas" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
