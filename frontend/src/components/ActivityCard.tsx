import "./ActivityCard.css";
import { ActivityScore } from "../types/Activity";

const activityIcons: Record<string, string> = {
  skiing: "🎿",
  surfing: "🏄‍♂️",
  outdoorSightseeing: "🏞️",
  indoorSightseeing: "🏛️",
};

const activityDescriptions: Record<string, string> = {
  skiing: "Best when it’s cold and snowy.",
  surfing: "Ideal when it’s warm and windy.",
  outdoorSightseeing: "Perfect with mild temperatures and no rain.",
  indoorSightseeing: "Recommended for rainy or extreme weather.",
};

export default function ActivityCard({ activity, score }: ActivityScore) {
  const icon = activityIcons[activity] || "❓";
  const description = activityDescriptions[activity] || "";
  const title = activity
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase());

  return (
    <div className="activity-card">
      <h3 className="activity-header">
        <span className="activity-icon">{icon}</span>
        <span className="activity-title">{title}</span>
      </h3>
      <p className="activity-description">{description}</p>
      <p
        className={`activity-score ${score > 0 ? "suitable" : "not-suitable"}`}
      >
        {score > 0
          ? `✅ Suitable ${score} out of 7 days this week`
          : `❌ Not suitable this week`}
      </p>
    </div>
  );
}
