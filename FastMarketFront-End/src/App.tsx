import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';


/* pages */
import ViewLogin from './pages/ViewLogin';
import ViewRegister from './pages/ViewRegister';
import ViewTabs from './pages/ViewTabs';

/* Tabs */
import HomePage from './pages/TabHome';
const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/ViewLogin" component={ViewLogin} />
          <Route exact path="/ViewRegister" component={ViewRegister} />
          <Route exact path="/ViewTabs" component={ViewTabs} />



          <Route exact path="/HomePage" component={HomePage} />





        




          <Redirect exact from="/" to="/ViewLogin" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
