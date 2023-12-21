"use client";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store'; // Adjust the path based on your structure
// Adjust the path based on your structure

 // Adjust the path based on your structure

function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
      {children}
        
      </PersistGate>
    </Provider>
  );
}

export default Providers;
