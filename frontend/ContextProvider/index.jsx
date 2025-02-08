import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  isShipmentPage: true,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "IS_SHIPMENT_PAGE":
      const { isShipmentPage } = payload;
      return {
        ...state,
        isShipmentPage: isShipmentPage,
      };
    default:
      return state;
  }
}

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
