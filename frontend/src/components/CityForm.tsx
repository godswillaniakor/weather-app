import { useState } from "react";

interface CityFormProps {
  onSubmit: (city: string, countryCode: string) => void;
}

const COUNTRY_CITIES: Record<string, string[]> = {
  GB: ["London", "Manchester", "Birmingham"],
  US: ["New York", "Los Angeles", "Chicago"],
  NG: ["Lagos", "Abuja", "Kano"],
};

export default function CityForm({ onSubmit }: CityFormProps) {
  const [countryCode, setCountryCode] = useState("GB");
  const [city, setCity] = useState(COUNTRY_CITIES["GB"][0]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setCountryCode(code);
    setCity(COUNTRY_CITIES[code][0]); // reset to first city
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(city, countryCode);
      }}
      style={{ display: "flex", gap: "1rem", alignItems: "center" }}
    >
      <div>
        <label>Country: </label>
        <select value={countryCode} onChange={handleCountryChange}>
          {Object.keys(COUNTRY_CITIES).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>City: </label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {COUNTRY_CITIES[countryCode].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Search</button>
    </form>
  );
}
