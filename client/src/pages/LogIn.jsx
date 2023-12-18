import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError("Login failed");
    }
  };

  // Use useEffect to fetch current user after login
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });

        const userData = await response.json();

        if (!response.ok) {
          // Handle error fetching current user
          console.error("Error fetching current user:", userData.message);
          return;
        }

        // Do something with the current user data
        console.log("Current user:", userData);
        console.log("name user:", userData.data.name);
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };

    // Check if a token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // If a token exists, fetch the current user
      fetchCurrentUser();
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LogIn;
