export abstract class Activity {
    abstract name: string;
  
    // Method to check if the activity is suitable for the given forecast
    abstract isSuitable(forecast: { maxTemp: number; rain: number; wind: number }): boolean;
  }