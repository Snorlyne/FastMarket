import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, personOutline, searchOutline } from "ionicons/icons";
import { Route, Redirect, useLocation } from "react-router-dom";

import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import SearchPage from "./SearchPage";

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
const IndexTabs: React.FC = () => {
  const location = useLocation();

 
  const tabChange = () => {
    console.log("Cambio")
  };

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
          <Route path="*/EditAdvert/:id" component={ProductCreate} exact />
          <Route path="/dashboard/profile/Profile" component={ProfileView} exact />
          <Route path="/dashboard/profile/MyAdvert" component={MyAdvert} exact />
          <Route path="/dashboard/profile/MyOffert" component={MyOffert} exact />
          <Route path="/dashboard/profile/Mysale" component={Mysale} exact />
          <Route path="/dashboard/profile/MyAdvert/ProductCreate" component={ProductCreate} exact />

          {/* Redirige a /home si no coincide ninguna ruta */}
          <Redirect exact path="/dashboard" to="/dashboard/home" />
        </IonRouterOutlet>

       
        <IonTabBar
          slot="bottom"
          className="bg-gray-950 shadow-2xl rounded-full px-4 py-2  mb-6 transform translate-y-2"
        >
          <IonTabButton
            tab="home"
            href="/dashboard/home"
            className="bg-transparent  hover:text-green-500 transition-colors duration-300"
            
          >
            <IonIcon icon={homeOutline} className="text-xl mb-1" />
            <IonLabel className="text-xs font-medium">Inicio</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="busqueda"
            href="/dashboard/search"
            className="flex flex-col items-center bg-transparent  hover:text-green-500 transition-colors duration-300"
            
          >
            <IonIcon icon={searchOutline} className="text-xl mb-1" />
            <IonLabel className="text-xs font-medium">Buscar</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="profile"
            href="/dashboard/profile"
            className="flex flex-col items-center bg-transparent hover:text-green-500 transition-colors duration-300"
          >
            <IonIcon icon={personOutline} className="text-xl mb-1" />
            <IonLabel className="text-xs font-medium">Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      
    </IonReactRouter>
  );
};

export default IndexTabs;