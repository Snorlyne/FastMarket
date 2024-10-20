import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';

/* Componentes */
import HomePage from './TabHome'; 
import ProfilePage from './TabProfile';


const Dashboard: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const renderContent = () => {
    switch (tabIndex) {
      case 0:
        return <HomePage />; 
      case 1:
        return <ProfilePage />; 
      case 2:
        return <ProfilePage />;  
      default:
        return <HomePage />;
    }
  };

  return (
    <Box >
      {renderContent()}

      {/* Barra de navegación inferior */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={tabIndex}
          onChange={(event, newValue) => {
            setTabIndex(newValue); 
          }}
        >
          <BottomNavigationAction label="Inicio" icon={<i className="fa-solid fa-house"></i>} />
          <BottomNavigationAction label="Tienda" icon={<i className="fa-solid fa-store"></i>} />
          <BottomNavigationAction label="Perfil" icon={<i className="fa-solid fa-user"></i>} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Dashboard;
