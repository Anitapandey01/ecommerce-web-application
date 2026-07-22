import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {

  const user = JSON.parse(localStorage.getItem("user"));

  // ==========================================================
  // OPTION 1: ADMIN ACCESS ONLY
  // Uncomment this block if you want only admin users
  // to access the Admin Dashboard.
  // ==========================================================

  /*
  if (!user || user.role !== "admin") {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <h1>Access Denied</h1>
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }
  */

  // ==========================================================
  // OPTION 2: DEMO / INTERNSHIP MODE (CURRENTLY ACTIVE)
  // Admin access is disabled so anyone can open
  // the Admin Dashboard.
  // ==========================================================

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, form);
        alert("Product Updated Successfully");
      } else {
        await API.post("/products", form);
        alert("Product Added Successfully");
      }

      setForm({
        name: "",
        description: "",
        price: "",
        image: "",
      });

      setEditingId(null);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      alert("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="admin-products">
        {products.map((product) => (
          <div className="admin-card" key={product._id}>
            <img
              src={product.image}
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>₹ {product.price}</p>

            <button
              onClick={() => editProduct(product)}
            >
              Edit
            </button>

            <button
              onClick={() => deleteProduct(product._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;