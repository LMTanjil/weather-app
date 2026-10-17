# Weather Dashboard

A responsive weather app for checking current conditions and short-term forecasts for cities around the world. Search for a location, choose the matching city, and view its weather in a clear dashboard.

## Features

- Search for cities and regions using location suggestions.
- View current temperature, feels-like temperature, humidity, wind speed, precipitation, and conditions.
- Explore hourly weather and precipitation probabilities.
- Check a three-day outlook, including high and low temperatures, sunrise, and sunset.
- Refresh weather data for the selected location.
- Use the dashboard on mobile, tablet, and desktop screens.

## Built with

- [Next.js](https://nextjs.org/) 16 and React 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide](https://lucide.dev/) icons
- [Open-Meteo](https://open-meteo.com/) geocoding and forecast APIs

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. No API key or environment variables are required for the public Open-Meteo endpoints used by this app.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Weather data

Location search uses the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api), and current conditions and forecasts use the [Open-Meteo Forecast API](https://open-meteo.com/en/docs). The app fetches data for the location selected in search and uses its local timezone for forecast times.
