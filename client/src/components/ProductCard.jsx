import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);

    alert("Product added to cart!");

    navigate("/cart");
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="card-body">
        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <h2>₹ {product.price}</h2>

        <div className="card-buttons">
          <button onClick={handleAddToCart}>
            Add to Cart
          </button>

          <Link
            to={`/product/${product._id}`}
            className="details-btn"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;