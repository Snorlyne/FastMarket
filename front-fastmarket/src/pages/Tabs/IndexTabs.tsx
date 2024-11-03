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


import MyAdvert from "../MyAdvertPage";
import ViewProduct from "../ProductViewPage";
import ProductCreate from "../ProductCreatePage"; 
import EditAdvert from "../EditAdvertPage";
import MyOffert from "../MyOfferPage";
import Mysale from "../MysalePage";
import ProfileView from "../ProfileViewPage";
import OffersHubPage from "../OfferHubPage";
import ChatList from "../ChatListPage";
import PrivateChat from "../ChatPrivateVendPage";
import SearchPage from "./SearchPage";


const IndexTabs: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* vista del Tabs */}
          <Route path="/dashboard/home" component={HomePage} exact />
          <Route path="/dashboard/profile" component={ProfilePage} exact />
          <Route path="/dashboard/search" component={SearchPage} exact />

          {/* Vista fuera del Tabs */}
          <Route path="*/offerhub/:id" component={OffersHubPage} exact />
          <Route path="*/ViewProduct/:id" component={ViewProduct} exact />
          <Route path="*/chatlist" component={ChatList} exact />
          <Route path="*/chat/:id" component={PrivateChat} exact />
          <Route path="/dashboard/profile/Profile" component={ProfileView} exact />
          <Route path="/dashboard/profile/MyAdvert" component={MyAdvert} exact />
          <Route path="/dashboard/profile/MyOffert" component={MyOffert} exact />
          <Route path="/dashboard/profile/Mysale" component={Mysale} exact />
          <Route path="/dashboard/profile/MyAdvert/ProductCreate" component={ProductCreate} exact />
          <Route path="/dashboard/profile/MyAdvert/ProductCreate/EditAdvert" component={EditAdvert} exact />
          {/* Redirige a /home si no coincide ninguna ruta */}
          <Redirect exact path="/dashboard" to="/dashboard/home" />
        </IonRouterOutlet>

        {/* Aquí están las pestañas (tab bar) */}
        <IonTabBar className=" " style={{
            backgroundColor: "#f8f9fa",
            borderTop: "1px solid #dee2e6",
  
        }} slot="bottom">
          <IonTabButton tab="home" href="/dashboard/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="busqueda" href="/dashboard/search">
            <IonIcon icon={searchOutline} />
            <IonLabel>Buscar</IonLabel>
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