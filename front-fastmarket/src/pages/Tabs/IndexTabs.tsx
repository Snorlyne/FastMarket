import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, personOutline, settingsOutline } from "ionicons/icons";
import { Route, Redirect } from 'react-router-dom';
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";

const IndexTabs: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* Define las rutas de las páginas */}
          <Route path="/dashboard/home" component={HomePage} exact />
          <Route path="/dashboard/profile" component={ProfilePage} exact />
          {/* Redirige a /home si no coincide ninguna ruta */}
          <Redirect exact path="/dashboard" to="/dashboard/home" />
        </IonRouterOutlet>

        {/* Aquí están las pestañas (tab bar) */}
        <IonTabBar style={{
            backgroundColor: "#f8f9fa",
            borderTop: "1px solid #dee2e6",
  
        }} slot="bottom">
          <IonTabButton tab="home" href="/dashboard/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/dashboard/profile">
            <IonIcon icon={personOutline} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default IndexTabs;
