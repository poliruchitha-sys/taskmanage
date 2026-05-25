import React, { useState } from "react";
import { authAPI } from "../api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
      await authAPI.register(formData.name, formData.email, formData.password);
      alert("Registered Successfully");
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '20px', margin: '20px 0', borderRadius: '5px' }}>
      <h2>Register</h2>

      {error && <p style={{color: 'red'}}>{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
      />

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
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default Register;
