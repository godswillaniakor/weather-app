import { Router } from 'express';
import { container } from 'tsyringe';
import WeatherController from '../controllers/WeatherController';

const router = Router();
const weatherController = container.resolve(WeatherController);

router.get('/', (req, res, next) => {
  weatherController.getCityWeather(req, res, next).catch(next);
});

export default router;