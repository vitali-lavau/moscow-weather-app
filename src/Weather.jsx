import React, { useEffect, useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [now, setNow] = useState(new Date());

  const API_KEY = "0563e6a83ede26ed2c036b91327a9353";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=${API_KEY}&lang=ru`,
        );
        const data = await res.json();

        if (res.ok) {
          setWeather(data);
        } else {
          setError("Ошибка загрузки погоды");
        }
      } catch (err) {
        setError("Сетевая ошибка");
      }
    };

    fetchWeather();
    setNow(new Date());
  }, []);

  if (error) {
    return (
      <div className="w-[90%] md:w-[480px] p-8 bg-white/80 rounded-2xl shadow-lg backdrop-blur-sm text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div>
        <p className="text-gray-600">Загрузка погоды...</p>
      </div>
    );
  }

  const moscowNow = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-[90%] md:w-[480px] p-4 lg:p-8 bg-white/80 rounded-2xl shadow-lg backdrop-blur-sm text-center">
      <h2>Добро пожаловать!</h2>
      <p className="mb-3 lg:mb-6 text-slate-500">
        Погода в Москве по состоянию на {moscowNow} (московское время)
      </p>
      <div className="flex flex-col gap-2 p-2 lg:gap-4 lg:p-4 rounded-xl border border-blue-300">
        <p>
          🌡 Температура: <b>{weather.main.temp}°C</b>
        </p>
        <p>
          ☁️ Погодные условия:{" "}
          <b className="capitalize">{weather.weather[0].description}</b>
        </p>
        <p>
          💨 Скорость ветра: <b>{weather.wind.speed} м/с</b>
        </p>
      </div>
    </div>
  );
};

export default Weather;
