import { injectable, inject } from "tsyringe";
import {
  ForecastResult,
  GeocodeResult,
  IWeatherClient,
} from "../interfaces/IWeatherClient";
import LoggerService from "../utils/LoggerService";
import { NotFoundError } from "../utils/NotFoundError";

@injectable()
export default class OpenMeteoClient implements IWeatherClient {
  constructor(@inject("LoggerService") private logger: LoggerService) {
    this.logger.setContext("OpenMeteoClient");
  }

  async geocodeCity(city: string, countryCode: string): Promise<GeocodeResult> {
    this.logger.info(`Geocoding city: ${city}`);

    const url = `https://geocoding-api.open-meteo.com/v1/search?${new URLSearchParams({
        name: city,
        ...(countryCode && { countryCode }) // Add countryCode if provided
      }).toString()}`;

    try {
      // Fetch data from the Open-Meteo Geocoding API
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch geocoding data: ${response.statusText}`
        );
      }

      const data = await response.json();

      // Ensure the response contains at least one result
      const place = data.results?.[0];
      if (!place) {
        throw new NotFoundError(`City "${city}/${countryCode}" not found`);
    }

      // Return the latitude and longitude of the first result
      return { lat: place.latitude, lon: place.longitude };
    } catch (error) {
      this.logger.error(`Failed to geocode city "${city}/${countryCode}"`);
      throw error;
    }
  }

  async getForecast(
    lat: number,
    lon: number,
    days: number = 7
  ): Promise<ForecastResult> {
    this.logger.info(`Fetching ${days}-day forecast for (${lat}, ${lon})`);

    const url = "https://api.open-meteo.com/v1/forecast";
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "wind_speed_10m_max",
      ].join(","),
      forecast_days: days.toString(),
      timezone: "auto",
    });

    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();

      const daily = data.daily;
      if (!daily) {
        throw new Error("Daily weather data is unavailable.");
      }

      const {
        time,
        temperature_2m_max,
        precipitation_sum,
        wind_speed_10m_max,
      } = daily;

      if (
        !time ||
        !temperature_2m_max ||
        !precipitation_sum ||
        !wind_speed_10m_max
      ) {
        throw new Error("Incomplete daily weather data received.");
      }

      const limit = Math.min(time.length, days);

      return {
        time: time.slice(0, limit).map((t: number) => new Date(t * 1000)),
        temperatureMax: temperature_2m_max.slice(0, limit),
        precipitation: precipitation_sum.slice(0, limit),
        windspeed: wind_speed_10m_max.slice(0, limit),
      };
    } catch (error) {
      this.logger.error("Failed to fetch forecast");
      throw error;
    }
  }
}
