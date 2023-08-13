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
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_PRODUCTS":
        return { ...state, products: action.payload };
      case "ADD_TO_CART":
        const item = action.payload;
        const isExisted = state.cart.find((c) => c.id === item.id);
        if (isExisted) {
          return {
            ...state,
            cart: state.cart.map((c) =>
              c.id === item.id ? { ...item } : { ...c }
            ),
          };
        } else {
          return {
            ...state,
            cart: [...state.cart, { ...item }],
          };
        }
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      case "DECREASE_ITEM":
        const decreasedItem = action.payload;
        const existingCartItem = state.cart.find(
          (item) => item.id === decreasedItem.id
        );

        if (existingCartItem.quantity > 1) {
          const updatedCart = state.cart.map((item) =>
            item.id === decreasedItem.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );

          return {
            ...state,
            cart: updatedCart,
          };
        } else {
          return state;
        }

      case "INCREASE_ITEM":
        const increasedItem = action.payload;
        const updatedCart = state.cart.map((item) =>
          item.id === increasedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return {
          ...state,
          cart: updatedCart,
        };

      case "CART_EMPTY":
        return { ...state, cart: (state.cart = []) };
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
