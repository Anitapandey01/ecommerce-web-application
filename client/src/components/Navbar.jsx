import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  const { cart } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
  <h2>ShopEase</h2>

  {user && (
    <p className="welcome">
      Welcome, {user.name}
    </p>
  )}
</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        <li><Link to="/orders">Orders</Link></li>

        <li>
          <Link to="/cart">
            <FaShoppingCart /> Cart ({cart.length})
          </Link>
        </li>

        <li><Link to="/admin">Admin</Link></li>

        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>

            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <li>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;