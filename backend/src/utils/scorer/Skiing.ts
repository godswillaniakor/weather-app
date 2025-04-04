import { Activity } from "./Activity";
import { TEMP_MIN_SKIING_C, RAIN_MIN_SKIING_MM } from "./thresholds";

export class Skiing extends Activity {
  name = "skiing";

  isSuitable({ maxTemp, rain }: { maxTemp: number; rain: number }): boolean {
    return maxTemp < TEMP_MIN_SKIING_C && rain >= RAIN_MIN_SKIING_MM;
  }
}
