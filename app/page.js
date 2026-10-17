import WeatherDashboard from "@/components/weather/WeatherDashboard";

export const metadata = {
  title: "Home",
  description: "Weather Dashboard provides current conditions and short-term forecasts for cities across the world.",
};

export default function HomePage() {
  return <WeatherDashboard />;
}
