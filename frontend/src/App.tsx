import { useState } from "react";
import axios from "axios";
import CityForm from "./components/CityForm";
import ActivityCard from "./components/ActivityCard";
import { ActivityScore } from "./types/Activity";

function App() {
  const [activities, setActivities] = useState<ActivityScore[]>([]);
  const [error, setError] = useState("");

  const fetchData = async (city: string, countryCode: string) => {
    try {
      const res = await axios.get(
        `/api/weather?city=${encodeURIComponent(
          city
        )}&countryCode=${countryCode}`
      );
      setActivities(res.data.data);
      setError("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.error || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weather Activity Ranking</h1>
      <CityForm onSubmit={fetchData} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {activities.map((a) => (
          <ActivityCard key={a.activity} {...a} />
        ))}
      </div>
    </div>
  );
}

export default App;
