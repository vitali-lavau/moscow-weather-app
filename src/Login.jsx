import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        onLoginSuccess();
      } else {
        setError(data.error || "Ошибка авторизации");
      }
    } catch (err) {
      setError("Сетевая ошибка");
    }
  };

  return (
    <div className="w-[90%] md:w-[480px] p-4 lg:p-8 bg-white/80 rounded-2xl shadow-lg backdrop-blur-sm text-center">
      <h2>Вход</h2>
      <p className="mb-3 lg:mb-6 text-slate-500">
        Авторизуйтесь, чтобы посмотреть прогноз погоды в Москве
      </p>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 lg:gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
