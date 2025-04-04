import { Activity } from './Activity';
import { TEMP_MIN_OUTDOOR_C, TEMP_MAX_OUTDOOR_C, RAIN_MAX_OUTDOOR_MM } from './thresholds';

export class OutdoorSightseeing extends Activity {
  name = 'outdoorSightseeing';

  isSuitable({ maxTemp, rain }: { maxTemp: number; rain: number }): boolean {
    return maxTemp >= TEMP_MIN_OUTDOOR_C && maxTemp <= TEMP_MAX_OUTDOOR_C && rain <= RAIN_MAX_OUTDOOR_MM;
  }
}