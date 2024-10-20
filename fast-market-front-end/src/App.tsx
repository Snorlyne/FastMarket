import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/ViewDashboard';
import ViewProducto from './pages/ViewProduct';
import Mysale from './pages/ViewMysale';
import VIewPerfil from './pages/ViewPerfil';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/ViewProducto" component={ViewProducto} />
          <Route exact path="/Mysale" component={Mysale} />
          <Route exact path="/VIewPerfil" component={VIewPerfil} />
          <Redirect exact from="/" to="/login" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
