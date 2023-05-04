import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import ContainerRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Header />
          <GlobalStyles />
          <ContainerRoutes />
          <ToastContainer closeButton={false} autoClose={1000} className="toast-container" />
          <Footer />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
