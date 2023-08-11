import { useEffect, useReducer, useState } from "react";
import { createContext, useContext } from "react";
import { getData } from "../api";

const StateContext = createContext();

const StateContextProvider = ({ children }) => {

    const [search, setSearch] = useState("");
  const initialState = {
    productList: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_PRODUCTS":
        return { ...state, productList: action.payload };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async () => {
    const data = await getData("/products");
    dispatch({ type: "GET_PRODUCTS", payload: data });
  };

  useEffect(() => {
    getProducts();
  }, []);
  
  const data = {state, search, setSearch};
  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
export default StateContextProvider;
