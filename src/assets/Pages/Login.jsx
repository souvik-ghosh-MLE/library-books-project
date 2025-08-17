import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const endpoint = isLogin ? "/login" : "/signup";
			const response = await fetch(`http://localhost:8000/api/v1/auth${endpoint}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const errData = await response.json();
				setMessage(errData.detail || "Something went wrong");
				return;
			}

			const data = await response.json();
			console.log("Response:", data);

			if (isLogin) {
				localStorage.setItem("access_token", data.access_token);
				localStorage.setItem("refresh_token", data.refresh_token);
				setMessage("Login successful!");

				// ✅ Redirect to Books page
				navigate("/books");
			} else {
				setMessage("Signup successful! Please login.");
				setIsLogin(true);
			}
		} catch (error) {
			console.error("Error:", error);
			setMessage("Network error. Please try again.");
		}
	};

	return (
		<div className="login-container">
			{/* toggle buttons */}
			<form className="login-form" onSubmit={handleSubmit}>
				<h2>{isLogin ? "Login" : "Signup"}</h2>
				<label>Email</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				<label>Password</label>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				<button type="submit">{isLogin ? "Login" : "Signup"}</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
};

export default Login;
