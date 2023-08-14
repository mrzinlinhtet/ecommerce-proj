import {
  AiFillDelete,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { useState } from "react";

const CartItem = ({ item, increasePrice, decreasePrice, total, setTotal }) => {
  const { dispatch } = useStateContext();
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQty((prev) => prev + 1);
    increasePrice(item.price);
    dispatch({ type: "INCREASE_QTY" });
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
      decreasePrice(item.price);
      dispatch({ type: "DECREASE_QTY" });
    }
  };
  console.log(qty)
  return (
    <div key={item.id} className="flex items-center gap-4">
      <img src={item?.image} className="h-32 border-2 rounded p-4" alt="" />
      <div className="">
        <h1 className="text-2xl font-semibold">{item?.title}</h1>
        <p className="text-secondary text-3xl my-3">${item?.price * qty}</p>
        <div className="flex gap-3 items-center">
          <AiFillMinusCircle
            onClick={decreaseQty}
            className="text-3xl text-danger cursor-pointer"
          />
          <p className="text-2xl">{qty}</p>
          <AiFillPlusCircle
            onClick={increaseQty}
            className="text-3xl text-info cursor-pointer"
          />
          <AiFillDelete
            onClick={() => {
              setTotal(total - (item.price * qty))
              dispatch({ type: "DECREASE_QTY_PAYLOAD", payload: qty });
              dispatch({ type: "REMOVE_FROM_CART", payload: item });
            }}
            className="text-danger text-2xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
