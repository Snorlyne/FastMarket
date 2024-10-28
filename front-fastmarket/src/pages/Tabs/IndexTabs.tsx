import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, personOutline, searchOutline, settingsOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import ViewMySale from "../ViewMyAnuncio";
import ViewProduct from "../ViewProduct";
import ViewMyAnuncio from "../ViewMyAnuncio";

/*         <Route exact path="/ViewMySale" component={ViewMySale} />
 */

const IndexTabs: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* Define las rutas de las páginas */}
          <Route path="/dashboard/home" component={HomePage} exact />
          <Route path="/dashboard/profile" component={ProfilePage} exact />
          <Route path="/dashboard/profile/misAnuncios" component={ViewMyAnuncio} exact />
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
          {/* <IonTabButton tab="busqueda" href="/dashboard/search">
            <IonIcon icon={searchOutline} />
            <IonLabel>Buscar</IonLabel>
          </IonTabButton> */}
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
