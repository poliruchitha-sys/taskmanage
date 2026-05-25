import React, { useState } from "react";
import { authAPI } from "../api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authAPI.login(formData.email, formData.password);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '20px', margin: '20px 0', borderRadius: '5px' }}>
      <h2>Login</h2>

      {error && <p style={{color: 'red'}}>{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
      />

      <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
