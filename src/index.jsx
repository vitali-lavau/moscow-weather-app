import "./index.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login.jsx";
import Weather from "./Weather.jsx";
import { LogOut } from "lucide-react";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsAuthenticated(!!token);
	}, []);

	const handleLoginSuccess = () => {
		setIsAuthenticated(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
	};

	return (
		<div className="min-h-screen relative flex items-center justify-center overflow-hidden">
			{isAuthenticated ? (
				<>
					<button
						onClick={handleLogout}
						className="absolute top-2 right-2 lg:top-4 lg:right-4 !bg-red-400 hover:!bg-red-600 z-10"
					>
						<span className=" hidden lg:inline">Выйти</span>
						<LogOut className="w-4 h-4 lg:hidden" />
					</button>

					<Weather />
				</>
			) : (
				<Login onLoginSuccess={handleLoginSuccess} />
			)}

			<div
				className="absolute top-0 left-0 w-full min-h-screen bg-cover bg-center z-[-1] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-20 lg:kenburns-right"
				style={{ backgroundImage: "url('/images/moscow.png')" }}
			></div>
		</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
