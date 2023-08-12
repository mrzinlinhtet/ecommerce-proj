import React from "react";
import { useStateContext } from "../context/StateContext";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart }, dispatch
  } = useStateContext();

  return (
    <div className="flex flex-col gap-5">
      {cart?.map((item) => (
        <div key={item.id} className="flex items-center gap-4">
          <img src={item?.image} className="h-32 border-2 rounded p-4" alt="" />
          <div className="">
            <h1>{item?.title}</h1>
            <p>{item?.price}</p>
            <p>{item?.qty}</p>
            <button onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: item})}>
              <AiFillDelete className="text-danger text-2xl" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
