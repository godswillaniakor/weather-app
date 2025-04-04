import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IWeatherService } from "../interfaces/IWeatherService";
import LoggerService from "../utils/LoggerService";
import { NotFoundError } from "../utils/NotFoundError";

@injectable()
export default class WeatherController {
  constructor(
    @inject("IWeatherService") private service: IWeatherService,
    @inject("LoggerService") private logger: LoggerService
  ) {
    this.logger.setContext("WeatherController");
  }

  async getCityWeather(req: Request, res: Response, next: NextFunction) {
    try {
      const city = req.query.city as string;
      const countryCode = req.query.countryCode as string;

      if (typeof city !== "string" || city.trim() === "") {
        return res.status(400).json({
          status: "error",
          data: null,
          error:
            "City query parameter is required and must be a non-empty string",
        });
      }

      if (typeof countryCode !== "string" || countryCode.trim() === "") {
        return res.status(400).json({
          status: "error",
          data: null,
          error:
            "CountryCode query parameter is required and must be a non-empty string",
        });
      }

      const result = await this.service.getRankingsForCity(city, countryCode);
      res.status(200).json({
        status: "success",
        data: result,
        error: null,
      });
    } catch (err) {
      next(err);
    }
  }
}
