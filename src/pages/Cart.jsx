import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useStateContext();
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch({ type: "CART_EMPTY" });
    navigate("/success");
  };

  const increasePrice = (price) => {
    setTotal((total) + price);
  };

  const decreasePrice = (price) => {
    setTotal((total) - price);
  };

  useEffect(() => {
    setTotal(cart.reduce((acc, item) => acc + item.price, 0));
  }, []);

  return (
    <>
      {" "}
      {cart.length > 0 ? (
        <div className="grid grid-cols-4">
          <div className="col-span-3 flex flex-col gap-5">
            {cart?.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increasePrice={increasePrice}
                decreasePrice={decreasePrice}
                total={total}
                setTotal={setTotal}
              />
            ))}
          </div>
          <div className="col-span-1">
            <div className="bg-gray-50 p-10 rounded shadow-lg">
              <h1 className="text-3xl text-info font-semibold">
                Total Price - ${total.toFixed(2)}
              </h1>

              <button
                onClick={handleCheckout}
                className="px-5 py-2 bg-info text-primary rounded shadow-lg uppercase my-5"
              >
                Checkout
              </button>
            </div>
            <button
              className="px-5 py-2 bg-danger text-primary rounded shadow-lg uppercase my-5"
              onClick={() => dispatch({ type: "CART_EMPTY" })}
            >
              Cart Empty
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center animate__animated animate__backInDown">
          <div className="bg-secondary p-20 rounded shadow-lg mt-20">
            <h1 className="text-4xl font-semibold tracking-wider my-5 text-primary">
              Your cart is EMPTY
            </h1>
            <button
              onClick={() => navigate("/")}
              className="text-primary bg-danger px-5 py-2 shadow-lg uppercase rounded transition hover:scale-105"
            >
              go shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
