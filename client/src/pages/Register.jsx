import imageform from "../images/formlogin.png";
import { useState } from "react";
// import "../style/login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Handle successful registration, e.g., redirect to login page
    } catch (err) {
      setError("Registration failed");
    }
  };
  return (
    <div className="all-page-login">
      <div className="image-form">
        <div>
          <img src={imageform} alt="Login Form" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <h2>Register</h2>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Email</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <button className="button-88 btn-log" type="submit">
            Register
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
