// Define reusable types for return values
export interface GeocodeResult {
  lat: number;
  lon: number;
}

export interface ForecastResult {
  time: Date[];
  temperatureMax: number[];
  precipitation: number[];
  windspeed: number[];
}

// Update the IWeatherClient interface to use the named types
export interface IWeatherClient {
  geocodeCity(city: string, countryCode: string): Promise<GeocodeResult>;
  getForecast(lat: number, lon: number, days: number): Promise<ForecastResult>;
}