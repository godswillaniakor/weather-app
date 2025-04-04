import { inject, injectable } from 'tsyringe';
import { IWeatherService } from '../interfaces/IWeatherService';
import { IWeatherClient } from '../interfaces/IWeatherClient';
import LoggerService from '../utils/LoggerService';
import { scoreActivities } from '../utils/scorer/Scorer';

@injectable()
export default class WeatherService implements IWeatherService {
  constructor(
    @inject('IWeatherClient') private client: IWeatherClient,
    @inject('LoggerService') private logger: LoggerService
  ) {
    this.logger.setContext('WeatherService');
  }

  async getRankingsForCity(city: string, countryCode: string) {
    this.logger.info(`Getting rankings for city: ${city}`);
    const coords = await this.client.geocodeCity(city, countryCode);
    const forecast = await this.client.getForecast(coords.lat, coords.lon, 7);
    return scoreActivities(forecast);
  }
}