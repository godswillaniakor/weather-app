import { Activity } from './Activity';
import { TEMP_MIN_COLD_C, TEMP_MAX_HOT_C, RAIN_INDOOR_THRESHOLD_MM } from './thresholds';

export class IndoorSightseeing extends Activity {
  name = 'indoorSightseeing';

  isSuitable({ maxTemp, rain }: { maxTemp: number; rain: number }): boolean {
    return maxTemp < TEMP_MIN_COLD_C || maxTemp > TEMP_MAX_HOT_C || rain > RAIN_INDOOR_THRESHOLD_MM;
  }
}