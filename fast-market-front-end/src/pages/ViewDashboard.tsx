import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import { Home, Storefront, Person } from '@mui/icons-material';

/* Componentes */
import HomePage from './HomeView';
import ShopPage from './ShopView';
import PerfilView from './profileView';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Router>
      <Header/>

      <Box sx={{ paddingTop: '64px', paddingBottom: '56px' }}>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/PerfilView" component={PerfilView} />
        </Switch>
      </Box>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Inicio" icon={<Home />} href="/home" />
          <BottomNavigationAction label="Tienda" icon={<Storefront />} href="/shop" />
          <BottomNavigationAction label="perfil" icon={<Person />} href="/PerfilView" />
        </BottomNavigation>
      </Paper>
    </Router>
  );
};

export default Dashboard;
