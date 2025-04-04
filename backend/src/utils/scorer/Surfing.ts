import { Activity } from "./Activity";
import { TEMP_MIN_SURFING_C, WIND_MIN_SURFING_MS } from "./thresholds";

export class Surfing extends Activity {
  name = "surfing";

  isSuitable({ maxTemp, wind }: { maxTemp: number; wind: number }): boolean {
    return maxTemp >= TEMP_MIN_SURFING_C && wind >= WIND_MIN_SURFING_MS;
  }
}
