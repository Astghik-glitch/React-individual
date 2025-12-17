import { createContext, useReducer } from "react";

export const WishlistContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return action.payload;
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    wishlist: null,
    items: []
  });

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};


