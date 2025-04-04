import { scoreActivities } from './Scorer';

describe('scoreActivities', () => {
  it('should return correct scores for activities based on forecast data', () => {
    const forecast = {
      time: [new Date('2025-04-01'), new Date('2025-04-02'), new Date('2025-04-03')],
      temperatureMax: [-5, 22, 18], // °C
      precipitation: [2, 0, 5], // mm
      windspeed: [5, 15, 8], // m/s
    };

    const result = scoreActivities(forecast);

    expect(result).toEqual([
      { activity: 'indoorSightseeing', score: 2 },
      { activity: 'skiing', score: 1 },
      { activity: 'surfing', score: 1 },
      { activity: 'outdoorSightseeing', score: 1 },
    ]);
  });

  it('should handle empty forecast data', () => {
    const forecast = {
      time: [],
      temperatureMax: [],
      precipitation: [],
      windspeed: [],
    };

    const result = scoreActivities(forecast);

    expect(result).toEqual([
      { activity: 'skiing', score: 0 },
      { activity: 'surfing', score: 0 },
      { activity: 'outdoorSightseeing', score: 0 },
      { activity: 'indoorSightseeing', score: 0 },
    ]);
  });

  it('should correctly sort activities by score in descending order', () => {
    const forecast = {
      time: [new Date('2025-04-01'), new Date('2025-04-02'), new Date('2025-04-03')],
      temperatureMax: [22, 22, -5], // °C
      precipitation: [0, 0, 0], // mm
      windspeed: [15, 15, 5], // m/s
    };

    const result = scoreActivities(forecast);

    expect(result).toEqual([
      { activity: 'surfing', score: 2 },
      { activity: 'outdoorSightseeing', score: 2 },
      { activity: 'indoorSightseeing', score: 1 },
      { activity: 'skiing', score: 0 },
    ]);
  });
});