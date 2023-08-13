import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import { AiFillDelete } from "react-icons/ai";
import { useState, useEffect} from "react";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useStateContext();
  const [total, setTotal] = useState(0)

  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch({ type: "CART_EMPTY" });
    navigate("/success");
  };

  useEffect(() => {
    setTotal(cart.reduce((acc, item) => acc + item.price, 0))
  },[])

  return (
    <> {cart.length > 0 ? (
      <div className="grid grid-cols-4">
      <div className="col-span-2 flex flex-col gap-5">
        {cart?.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <img
              src={item?.image}
              className="h-32 border-2 rounded p-4"
              alt=""
            />
            <div className="">
              <h1>{item?.title}</h1>
              <p>${item?.price}</p>
              <p>{item?.qty}</p>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: item })
                }
              >
                <AiFillDelete className="text-danger text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-2">
        <div className="bg-gray-50 p-10 rounded shadow-lg">
          <h1 className="text-3xl text-info font-semibold">
            Total Price - ${total}
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
        <button onClick={() => navigate('/')} className="text-primary bg-danger px-5 py-2 shadow-lg uppercase rounded transition hover:scale-105">
          go shopping
        </button>
      </div>
    </div>

    )}

    </>
  );
};

export default Cart;
