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
import ProductForm from "../ViewProductCreate"; 
import EditAnuncio from "../ViewEditAnuncio";
import ViewMyOferta from "../ViewMyOferta";
import ViewMyVentas from "../ViewMyVentas";
import ViewProfile from "../ViewProfile";


const IndexTabs: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* Define las rutas de las páginas */}
          <Route path="/dashboard/home" component={HomePage} exact />
          <Route path="/dashboard/home/ViewProduct" component={ViewProduct} exact />


          <Route path="/dashboard/profile" component={ProfilePage} exact />
          <Route path="/dashboard/profile/ViewProfile" component={ViewProfile} exact />
          <Route path="/dashboard/profile/misAnuncios" component={ViewMySale} exact />
          <Route path="/dashboard/profile/ViewMyVentas" component={ViewMyVentas} exact />
          <Route path="/dashboard/profile/ViewMyOferta" component={ViewMyOferta} exact />



          <Route path="/dashboard/profile/misAnuncios/publicarAnuncio" component={ProductForm} exact />
          <Route path="/misAnuncios/publicarAnuncio/EditAnuncio" component={EditAnuncio} exact />



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