import { Skiing } from "./Skiing";
import { Surfing } from "./Surfing";
import { OutdoorSightseeing } from "./OutdoorSightseeing";
import { IndoorSightseeing } from "./IndoorSightseeing";

export function scoreActivities(forecast: {
  time: Date[];
  temperatureMax: number[];
  precipitation: number[];
  windspeed: number[];
}) {
  const activities = [
    new Skiing(),
    new Surfing(),
    new OutdoorSightseeing(),
    new IndoorSightseeing(),
  ];

  const scores = activities.map((activity) => ({
    activity: activity.name,
    score: 0,
  }));

  for (let i = 0; i < forecast.time.length; i++) {
    const maxTemp = forecast.temperatureMax[i];
    const rain = forecast.precipitation[i];
    const wind = forecast.windspeed[i];

    activities.forEach((activity) => {
      if (activity.isSuitable({ maxTemp, rain, wind })) {
        const scoreEntry = scores.find(
          (entry) => entry.activity === activity.name
        );
        if (scoreEntry) {
          scoreEntry.score++;
        }
      }
    });
  }

  return scores.sort((a, b) => b.score - a.score);
}
