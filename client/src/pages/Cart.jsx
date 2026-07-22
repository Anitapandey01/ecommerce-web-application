import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      const products = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      await API.post("/orders", {
        user: user._id,
        products,
        totalPrice: total,
      });

      alert("Order Placed Successfully");

      clearCart();

      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert("Checkout Failed");
    }
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h3>{item.name}</h3>

                <p>Price : ₹ {item.price}</p>

                <p>Quantity : {item.quantity}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total : ₹ {total}</h2>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;