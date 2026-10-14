import React, { useEffect, useState } from "react";
import Header from "../Components/Header";

interface CurrentWeatherResponse {
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
        time: string;
        interval: string;
        temperature_2m: string;
        relative_humidity_2m: string;
        apparent_temperature: string;
        wind_speed_10m: string;
    };
    current: {
        time: string;
        interval: number;
        temperature_2m: number;
        relative_humidity_2m: number;
        apparent_temperature: number;
        wind_speed_10m: number;
    };
}

interface DailyWeatherResponse {
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: {
        time: string;
        weather_code: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
    };
    daily: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    };
}

const getWeatherInfo = (code: number): { label: string; icon: string; bg: string } => {
    switch (code) {
        case 0:
            return { label: "Clear sky", icon: "☀️", bg: "bg-amber-50 text-amber-600 border-amber-200" };
        case 1:
            return { label: "Mainly clear", icon: "🌤️", bg: "bg-sky-50 text-sky-600 border-sky-200" };
        case 2:
            return { label: "Partly cloudy", icon: "⛅", bg: "bg-blue-50 text-blue-600 border-blue-200" };
        case 3:
            return { label: "Overcast", icon: "☁️", bg: "bg-gray-100 text-gray-600 border-gray-300" };
        case 45:
        case 48:
            return { label: "Foggy", icon: "🌫️", bg: "bg-slate-100 text-slate-600 border-slate-300" };
        case 51:
        case 53:
        case 55:
            return { label: "Drizzle", icon: "🌦️", bg: "bg-cyan-50 text-cyan-600 border-cyan-200" };
        case 61:
        case 63:
        case 65:
            return { label: "Rainy", icon: "🌧️", bg: "bg-blue-50 text-blue-700 border-blue-300" };
        case 71:
        case 73:
        case 75:
            return { label: "Snow", icon: "❄️", bg: "bg-indigo-50 text-indigo-600 border-indigo-200" };
        case 80:
        case 81:
        case 82:
            return { label: "Rain showers", icon: "🌧️", bg: "bg-blue-50 text-blue-800 border-blue-300" };
        case 95:
        case 96:
        case 99:
            return { label: "Thunderstorm", icon: "⛈️", bg: "bg-purple-50 text-purple-700 border-purple-300" };
        default:
            return { label: "Cloudy", icon: "🌤️", bg: "bg-gray-50 text-gray-600 border-gray-200" };
    }
};

const formatDate = (dateStr: string, index: number): string => {
    if (index === 0) return "Today";
    if (index === 1) return "Tomorrow";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

const ApiTest: React.FC = () => {
    const CURRENT_API_URL =
        "https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=Asia%2FKathmandu";
    const DAILY_API_URL =
        "https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FKathmandu";

    const [currentData, setCurrentData] = useState<CurrentWeatherResponse | null>(null);
    const [dailyData, setDailyData] = useState<DailyWeatherResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async () => {
        setError(null);
        setLoading(true);
        try {
            const [currentRes, dailyRes] = await Promise.all([
                fetch(CURRENT_API_URL),
                fetch(DAILY_API_URL),
            ]);

            if (!currentRes.ok || !dailyRes.ok) {
                throw new Error("Failed to fetch weather data from Open-Meteo API");
            }

            const currentJson: CurrentWeatherResponse = await currentRes.json();
            const dailyJson: DailyWeatherResponse = await dailyRes.json();

            setCurrentData(currentJson);
            setDailyData(dailyJson);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred while fetching API data");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadInitialData = async () => {
            try {
                const [currentRes, dailyRes] = await Promise.all([
                    fetch(CURRENT_API_URL),
                    fetch(DAILY_API_URL),
                ]);

                if (!currentRes.ok || !dailyRes.ok) {
                    throw new Error("Failed to fetch weather data from Open-Meteo API");
                }

                const currentJson: CurrentWeatherResponse = await currentRes.json();
                const dailyJson: DailyWeatherResponse = await dailyRes.json();

                if (isMounted) {
                    setCurrentData(currentJson);
                    setDailyData(dailyJson);
                }
            } catch (err: unknown) {
                if (isMounted) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError("An unexpected error occurred while fetching API data");
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadInitialData();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Header />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Page Title & Controls */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                            Kathmandu Weather Forecast
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Live data for Kathmandu (Lat: 27.7172, Long: 85.3240) fetched from Open-Meteo.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={fetchWeatherData}
                            disabled={loading}
                            className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-[#3549A0] px-4 py-2 text-sm font-medium text-white shadow-xs transition hover:bg-[#2b3c85] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <svg
                                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            {loading ? "Refreshing..." : "Refresh"}
                        </button>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <p className="font-semibold">Error Loading Weather Data</p>
                        <p className="mt-1">{error}</p>
                        <button
                            type="button"
                            onClick={fetchWeatherData}
                            className="mt-3 cursor-pointer text-xs font-semibold text-red-800 underline hover:text-red-950"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {loading && !currentData && !dailyData && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#3549A0] border-t-transparent"></div>
                        <p className="mt-4 text-sm font-medium text-gray-500">
                            Fetching Open-Meteo weather data...
                        </p>
                    </div>
                )}

                <div className="space-y-8">
                        {/* Current Weather Card */}
                        {currentData && (
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3549A0] to-[#1e2a5e] p-6 text-white shadow-lg sm:p-8">
                                <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                                    <div>
                                        <div className="flex items-center gap-2 text-blue-200 text-sm font-medium">
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            <span>
                                                Kathmandu, Nepal ({currentData.timezone_abbreviation})
                                            </span>
                                        </div>
                                        <h2 className="mt-2 text-4xl font-extrabold sm:text-6xl">
                                            {currentData.current.temperature_2m}
                                            <span className="text-3xl sm:text-4xl">
                                                {currentData.current_units.temperature_2m}
                                            </span>
                                        </h2>
                                        <p className="mt-2 text-sm text-blue-100">
                                            Feels like{" "}
                                            <span className="font-semibold text-white">
                                                {currentData.current.apparent_temperature}
                                                {currentData.current_units.apparent_temperature}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                                        <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-xs">
                                            <p className="text-xs text-blue-200">Relative Humidity</p>
                                            <p className="mt-1 text-xl font-bold">
                                                {currentData.current.relative_humidity_2m}
                                                <span className="text-sm font-normal text-blue-200">
                                                    {currentData.current_units.relative_humidity_2m}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-xs">
                                            <p className="text-xs text-blue-200">Wind Speed</p>
                                            <p className="mt-1 text-xl font-bold">
                                                {currentData.current.wind_speed_10m}
                                                <span className="text-xs font-normal text-blue-200 ml-1">
                                                    {currentData.current_units.wind_speed_10m}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="col-span-2 rounded-xl bg-white/10 p-3.5 backdrop-blur-xs sm:col-span-1">
                                            <p className="text-xs text-blue-200">Elevation</p>
                                            <p className="mt-1 text-xl font-bold">
                                                {currentData.elevation}
                                                <span className="text-sm font-normal text-blue-200 ml-1">m</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap items-center justify-between border-t border-white/10 pt-4 text-xs text-blue-200">
                                    <span>
                                        Reported Time:{" "}
                                        {new Date(currentData.current.time).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                    <span>Timezone: {currentData.timezone}</span>
                                </div>
                            </div>
                        )}

                        {/* 7-Day Forecast Section */}
                        {dailyData && (
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        7-Day Daily Forecast
                                    </h2>
                                    <span className="text-xs text-gray-500">
                                        Max / Min Temperatures
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
                                    {dailyData.daily.time.map((time, idx) => {
                                        const weather = getWeatherInfo(dailyData.daily.weather_code[idx]);
                                        const maxTemp = dailyData.daily.temperature_2m_max[idx];
                                        const minTemp = dailyData.daily.temperature_2m_min[idx];
                                        const isToday = idx === 0;

                                        return (
                                            <div
                                                key={time}
                                                className={`flex flex-col justify-between rounded-xl border p-4 transition-all hover:shadow-md ${
                                                    isToday
                                                        ? "border-[#3549A0] bg-blue-50/40 shadow-xs"
                                                        : "border-gray-200 bg-white"
                                                }`}
                                            >
                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <span
                                                            className={`text-xs font-semibold ${
                                                                isToday ? "text-[#3549A0]" : "text-gray-700"
                                                            }`}
                                                        >
                                                            {formatDate(time, idx)}
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            {time.slice(5)}
                                                        </span>
                                                    </div>

                                                    <div className="my-3 flex items-center justify-center">
                                                        <span className="text-3xl">{weather.icon}</span>
                                                    </div>

                                                    <div className="text-center">
                                                        <span
                                                            className={`inline-block rounded-md border px-2 py-0.5 text-xs font-medium ${weather.bg}`}
                                                        >
                                                            {weather.label}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-4 border-t border-gray-100 pt-3 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="text-sm font-bold text-gray-900">
                                                            {maxTemp}
                                                            {dailyData.daily_units.temperature_2m_max}
                                                        </span>
                                                        <span className="text-xs text-gray-400">/</span>
                                                        <span className="text-xs font-medium text-gray-500">
                                                            {minTemp}
                                                            {dailyData.daily_units.temperature_2m_min}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
            </main>
        </div>
    );
};

export default ApiTest;
