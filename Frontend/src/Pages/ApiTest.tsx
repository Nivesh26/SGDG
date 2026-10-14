import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import {
    WiDaySunny,
    WiDayCloudy,
    WiCloudy,
    WiFog,
    WiSprinkle,
    WiRain,
    WiSnow,
    WiShowers,
    WiThunderstorm,
    WiHumidity,
    WiStrongWind,
    WiBarometer,
} from "react-icons/wi";
import { FaStar } from "react-icons/fa";

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

interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
}

interface TmdbResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
    status_message?: string;
    success?: boolean;
}

const PREVIEW_MOVIES: Movie[] = [
    {
        id: 278,
        title: "The Shawshank Redemption",
        original_title: "The Shawshank Redemption",
        overview: "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
        poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
        release_date: "1994-09-23",
        vote_average: 8.7,
        vote_count: 26500,
    },
    {
        id: 238,
        title: "The Godfather",
        original_title: "The Godfather",
        overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
        poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        backdrop_path: "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
        release_date: "1972-03-14",
        vote_average: 8.7,
        vote_count: 19800,
    },
    {
        id: 240,
        title: "The Godfather Part II",
        original_title: "The Godfather Part II",
        overview: "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York.",
        poster_path: "/hek3koDUyMrk7ujAh4Nt39naAC.jpg",
        backdrop_path: "/kGzFbGhp99zva6oZODq5atUegQI.jpg",
        release_date: "1974-12-20",
        vote_average: 8.6,
        vote_count: 12000,
    },
    {
        id: 424,
        title: "Schindler's List",
        original_title: "Schindler's List",
        overview: "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory.",
        poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
        backdrop_path: "/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
        release_date: "1993-12-15",
        vote_average: 8.6,
        vote_count: 15300,
    },
    {
        id: 155,
        title: "The Dark Knight",
        original_title: "The Dark Knight",
        overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.",
        poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
        release_date: "2008-07-16",
        vote_average: 8.5,
        vote_count: 32000,
    },
    {
        id: 389,
        title: "12 Angry Men",
        original_title: "12 Angry Men",
        overview: "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father.",
        poster_path: "/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
        backdrop_path: "/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
        release_date: "1957-04-10",
        vote_average: 8.5,
        vote_count: 8500,
    },
    {
        id: 129,
        title: "Spirited Away",
        original_title: "千と千尋の神隠し",
        overview: "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
        poster_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
        backdrop_path: "/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg",
        release_date: "2001-07-20",
        vote_average: 8.5,
        vote_count: 16000,
    },
    {
        id: 497,
        title: "The Green Mile",
        original_title: "The Green Mile",
        overview: "A supernatural tale for the ages unfolds on death row in a Southern prison, where a gentle giant possesses the mysterious power to heal people's ailments.",
        poster_path: "/8VG8fDNiy50849qv395n9Ozvi61.jpg",
        backdrop_path: "/l6hQWH92vc4oY0ikxXdJMPPf50U.jpg",
        release_date: "1999-12-10",
        vote_average: 8.5,
        vote_count: 16800,
    },
    {
        id: 680,
        title: "Pulp Fiction",
        original_title: "Pulp Fiction",
        overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in four tales of violence and redemption.",
        poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
        release_date: "1994-09-10",
        vote_average: 8.5,
        vote_count: 27000,
    },
    {
        id: 122,
        title: "The Lord of the Rings: The Return of the King",
        original_title: "The Lord of the Rings: The Return of the King",
        overview: "As armies mass for a final battle that will decide the fate of the world, one member of the Fellowship of the Ring is revealed as the noble heir to the throne of Men.",
        poster_path: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        backdrop_path: "/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",
        release_date: "2003-12-01",
        vote_average: 8.5,
        vote_count: 23500,
    },
];

const getWeatherInfo = (code: number): { label: string; icon: React.ReactNode; bg: string } => {
    switch (code) {
        case 0:
            return {
                label: "Clear sky",
                icon: <WiDaySunny className="h-10 w-10 text-amber-500" />,
                bg: "bg-amber-50 text-amber-600 border-amber-200",
            };
        case 1:
            return {
                label: "Mainly clear",
                icon: <WiDayCloudy className="h-10 w-10 text-sky-500" />,
                bg: "bg-sky-50 text-sky-600 border-sky-200",
            };
        case 2:
            return {
                label: "Partly cloudy",
                icon: <WiDayCloudy className="h-10 w-10 text-blue-500" />,
                bg: "bg-blue-50 text-blue-600 border-blue-200",
            };
        case 3:
            return {
                label: "Overcast",
                icon: <WiCloudy className="h-10 w-10 text-gray-500" />,
                bg: "bg-gray-100 text-gray-600 border-gray-300",
            };
        case 45:
        case 48:
            return {
                label: "Foggy",
                icon: <WiFog className="h-10 w-10 text-slate-500" />,
                bg: "bg-slate-100 text-slate-600 border-slate-300",
            };
        case 51:
        case 53:
        case 55:
            return {
                label: "Drizzle",
                icon: <WiSprinkle className="h-10 w-10 text-cyan-500" />,
                bg: "bg-cyan-50 text-cyan-600 border-cyan-200",
            };
        case 61:
        case 63:
        case 65:
            return {
                label: "Rainy",
                icon: <WiRain className="h-10 w-10 text-blue-600" />,
                bg: "bg-blue-50 text-blue-700 border-blue-300",
            };
        case 71:
        case 73:
        case 75:
            return {
                label: "Snow",
                icon: <WiSnow className="h-10 w-10 text-indigo-400" />,
                bg: "bg-indigo-50 text-indigo-600 border-indigo-200",
            };
        case 80:
        case 81:
        case 82:
            return {
                label: "Rain showers",
                icon: <WiShowers className="h-10 w-10 text-blue-700" />,
                bg: "bg-blue-50 text-blue-800 border-blue-300",
            };
        case 95:
        case 96:
        case 99:
            return {
                label: "Thunderstorm",
                icon: <WiThunderstorm className="h-10 w-10 text-purple-600" />,
                bg: "bg-purple-50 text-purple-700 border-purple-300",
            };
        default:
            return {
                label: "Cloudy",
                icon: <WiDayCloudy className="h-10 w-10 text-gray-500" />,
                bg: "bg-gray-50 text-gray-600 border-gray-200",
            };
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

    // Weather states
    const [currentData, setCurrentData] = useState<CurrentWeatherResponse | null>(null);
    const [dailyData, setDailyData] = useState<DailyWeatherResponse | null>(null);
    const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
    const [weatherError, setWeatherError] = useState<string | null>(null);

    // TMDB Movie states
    const [movies, setMovies] = useState<Movie[]>(PREVIEW_MOVIES);

    const fetchWeatherData = async () => {
        setWeatherError(null);
        setWeatherLoading(true);
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
                setWeatherError(err.message);
            } else {
                setWeatherError("An unexpected error occurred while fetching API data");
            }
        } finally {
            setWeatherLoading(false);
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
                        setWeatherError(err.message);
                    } else {
                        setWeatherError("An unexpected error occurred while fetching API data");
                    }
                }
            } finally {
                if (isMounted) {
                    setWeatherLoading(false);
                }
            }
        };

        const loadInitialMovies = async (key: string) => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=${encodeURIComponent(key)}`
                );
                const data: TmdbResponse = await response.json();
                if (isMounted && data.results && data.results.length > 0) {
                    setMovies(data.results);
                }
            } catch {
                // Keep default preview movies
            }
        };

        loadInitialData();

        const storedKey = localStorage.getItem("tmdb_api_key") || "";
        if (storedKey) {
            loadInitialMovies(storedKey);
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Header />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
                {/* Weather Section Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
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
                            disabled={weatherLoading}
                            className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-[#3549A0] px-4 py-2 text-sm font-medium text-white shadow-xs transition hover:bg-[#2b3c85] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <svg
                                className={`h-4 w-4 ${weatherLoading ? "animate-spin" : ""}`}
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
                            {weatherLoading ? "Refreshing..." : "Refresh Weather"}
                        </button>
                    </div>
                </div>

                {/* Weather Error Banner */}
                {weatherError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <p className="font-semibold">Error Loading Weather Data</p>
                        <p className="mt-1">{weatherError}</p>
                        <button
                            type="button"
                            onClick={fetchWeatherData}
                            className="mt-3 cursor-pointer text-xs font-semibold text-red-800 underline hover:text-red-950"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Weather Loading State */}
                {weatherLoading && !currentData && !dailyData && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3549A0] border-t-transparent"></div>
                        <p className="mt-3 text-sm font-medium text-gray-500">
                            Fetching Open-Meteo weather data...
                        </p>
                    </div>
                )}

                {/* Weather Dashboard */}
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
                                        <div className="flex items-center gap-1 text-blue-200">
                                            <WiHumidity className="h-5 w-5" />
                                            <p className="text-xs">Relative Humidity</p>
                                        </div>
                                        <p className="mt-1 text-xl font-bold">
                                            {currentData.current.relative_humidity_2m}
                                            <span className="text-sm font-normal text-blue-200">
                                                {currentData.current_units.relative_humidity_2m}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-xs">
                                        <div className="flex items-center gap-1 text-blue-200">
                                            <WiStrongWind className="h-5 w-5" />
                                            <p className="text-xs">Wind Speed</p>
                                        </div>
                                        <p className="mt-1 text-xl font-bold">
                                            {currentData.current.wind_speed_10m}
                                            <span className="text-xs font-normal text-blue-200 ml-1">
                                                {currentData.current_units.wind_speed_10m}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="col-span-2 rounded-xl bg-white/10 p-3.5 backdrop-blur-xs sm:col-span-1">
                                        <div className="flex items-center gap-1 text-blue-200">
                                            <WiBarometer className="h-5 w-5" />
                                            <p className="text-xs">Elevation</p>
                                        </div>
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
                                            className={`cursor-pointer flex flex-col justify-between rounded-xl border p-4 transition-all hover:shadow-md ${
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
                                                    {weather.icon}
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

                {/* TMDB Top Rated Movies Section */}
                <div className="pt-8 border-t border-gray-200 space-y-6">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                            Top Rated Movies
                        </h2>
                    </div>

                    {/* Movie Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {movies.map((movie) => {
                            const releaseYear = movie.release_date
                                ? movie.release_date.split("-")[0]
                                : "N/A";
                            const posterUrl = movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://via.placeholder.com/500x750?text=No+Poster";

                            return (
                                <div
                                    key={movie.id}
                                    className="group cursor-pointer flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {/* Poster Image */}
                                    <div className="relative aspect-2/3 w-full overflow-hidden bg-gray-100">
                                        <img
                                            src={posterUrl}
                                            alt={movie.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />

                                        {/* Rating Pill */}
                                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-xs font-bold text-amber-400 backdrop-blur-xs">
                                            <FaStar className="h-3 w-3" />
                                            <span>{movie.vote_average.toFixed(1)}</span>
                                        </div>

                                        {/* Release Year Pill */}
                                        <div className="absolute bottom-2.5 left-2.5 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-xs">
                                            {releaseYear}
                                        </div>
                                    </div>

                                    {/* Movie Info */}
                                    <div className="flex flex-1 flex-col justify-between p-3.5">
                                        <div>
                                            <h3
                                                className="line-clamp-1 text-sm font-bold text-gray-900 group-hover:text-[#3549A0]"
                                                title={movie.title}
                                            >
                                                {movie.title}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                                                {movie.overview}
                                            </p>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 text-[11px] text-gray-400">
                                            <span>{movie.vote_count.toLocaleString()} votes</span>
                                            <span className="font-semibold text-gray-600">TMDB</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ApiTest;
