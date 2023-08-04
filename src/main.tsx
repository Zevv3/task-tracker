import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseAppProvider } from 'reactfire'

import { firebaseConfig } from './firebaseConfig.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>,
)
