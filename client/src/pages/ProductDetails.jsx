import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <h2 style={{ textAlign: "center", marginTop: "80px" }}>Loading...</h2>;
  }

  return (
    <div className="details-page">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="details-info">

        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <h2>₹ {product.price}</h2>

        <button
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;