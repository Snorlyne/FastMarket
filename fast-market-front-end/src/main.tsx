import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <GoogleOAuthProvider clientId="671412607221-k1bmsn66flsn3rrd5415husfc32psh6k.apps.googleusercontent.com">

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
);