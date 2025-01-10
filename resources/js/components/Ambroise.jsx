import React, { createContext, useState, useContext } from 'react';

// Création du contexte
const AppContext = createContext();

// Composant Provider qui fournira les données aux composants enfants
export const AppProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState(false);

  return (
    <AppContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook pour accéder au contexte
export const useAppContext = () => useContext(AppContext);
