import { container } from "tsyringe";
import LoggerService from "./utils/LoggerService";
import WeatherService from "./services/WeatherService";
import OpenMeteoClient from "./clients/OpenMeteoClient";
import { IWeatherService } from "./interfaces/IWeatherService";
import { IWeatherClient } from "./interfaces/IWeatherClient";

container.register<LoggerService>("LoggerService", {
  useFactory: () => new LoggerService(),
});
container.register<IWeatherClient>("IWeatherClient", {
  useClass: OpenMeteoClient,
});
container.register<IWeatherService>("IWeatherService", {
  useClass: WeatherService,
});
