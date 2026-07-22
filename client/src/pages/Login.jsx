import { useState } from "react";
import API from "../services/api";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

    } catch (error) {

      alert(error.response?.data?.message || "Login Failed");

    }

  };

  return (

    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;