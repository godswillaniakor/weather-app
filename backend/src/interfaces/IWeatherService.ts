export interface IWeatherService {
    getRankingsForCity(city: string, countryCode: string): Promise<{ activity: string; score: number; }[]>;
  }