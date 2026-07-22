import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

 const fetchProducts = async () => {
  try {
    const res = await API.get("/products");

    console.log("Products:", res.data);

    setProducts(res.data);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <section className="products">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;