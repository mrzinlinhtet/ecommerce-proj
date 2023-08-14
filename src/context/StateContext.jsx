import { useEffect, useReducer, useState } from "react";
import { createContext, useContext } from "react";
import { getData } from "../api";

const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);

  const initialState = {
    products: [],
    cart: [],
    totalQty: 0,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_PRODUCTS":
        return { ...state, products: action.payload };
      case "ADD_TO_CART":
        const item = action.payload;
        const isExisted = state.cart.find((c) => c.id === item.id);
        if (isExisted) {
          return state;
          // ...state,
          // cart: state.cart.map((c) =>
          //   c.id === item.id ? { ...item } : { ...c }
          // ),
        } else {
          return {
            ...state,
            cart: [...state.cart, { ...item }],
            totalQty: state.totalQty + 1,
          };
        }
      case "INCREASE_QTY":
        return {
          ...state,
          totalQty: state.totalQty + 1,
        };
      case "DECREASE_QTY":
        return {
          ...state,
          totalQty: state.totalQty - 1,
        };
        case "DECREASE_QTY_PAYLOAD":
          return {
            ...state,
            totalQty: state.totalQty - action.payload,
          };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id)
        };
      case "CART_EMPTY":
        return { ...state, cart: (state.cart = []), totalQty: 0 };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async () => {
    const data = await getData("/products");
    setProductList(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_PRODUCTS", payload: productList });
    const filterProduct = productList.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    dispatch({ type: "GET_PRODUCTS", payload: filterProduct });
  }, [productList, search]);

  const data = { state, search, setSearch, dispatch };

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
export default StateContextProvider;
