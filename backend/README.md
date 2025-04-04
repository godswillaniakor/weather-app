# 📡 Weather Activity Ranking – Backend

This is the backend service for the **Weather Activity Ranking App**, which provides weather-based recommendations for activities like skiing, surfing, outdoor sightseeing, and indoor sightseeing. It uses [Open-Meteo](https://open-meteo.com/) as the weather data source and offers a clean API for frontend consumption.

---

## 🔧 Tech Stack

| Tool/Library           | Why it was chosen                                           |
|------------------------|------------------------------------------------------------|
| **Node.js + TypeScript** | Type-safe, performant backend with strong developer tooling |
| **Express.js**         | Minimal and widely adopted web framework                  |
| **tsyringe**           | Lightweight dependency injection container                |
| **Winston**            | For structured, async-friendly logging                    |
| **AsyncLocalStorage**  | Enables per-request `requestId` traceability across async calls |
| **Open-Meteo API**     | Free, no-auth weather data provider with hourly/daily endpoints |

---

## 🧱 Project Structure

```plaintext
src/
├── clients/           # External API clients (Open-Meteo, geocoding, etc)
├── controllers/       # Express route handlers
├── interfaces/        # Abstractions for DI
├── middlewares/       # Logging, error handling, etc
├── routes/            # All API route definitions
├── services/          # Core business logic
├── utils/             # Reusable utilities (e.g., logging, scoring)
├── container.ts       # DI container config
└── index.ts           # App entrypoint
```

---

## ✨ Key Features

### ✅ Strategy Pattern for Extensibility
- The **Strategy Pattern** is used to manage activity scoring logic.
- Each activity (e.g., skiing, surfing, outdoor sightseeing, indoor sightseeing) implements its own `isSuitable` method.
- Adding new activities in the future is as simple as creating a new class that implements the `Activity` interface and adding it to the scoring logic.

### ✅ Decoupled Dependencies
- The project follows a **decoupled architecture**:
  - **Controllers** depend on **service interfaces**, not concrete implementations.
  - **Services** depend on **client interfaces**, not concrete API clients.
- This ensures loose coupling and makes the codebase highly testable and maintainable.

### ✅ Dependency Injection via `tsyringe`
- Promotes testability and loose coupling.
- Ensures clean separation: Controller → Service → Client.

### ✅ Async-Scoped Logging with Trace ID
- Every incoming request is assigned a `uuid` as a `requestId`.
- All logs for that request carry the same trace ID using `AsyncLocalStorage`.

### ✅ Standardized Response Format
- All API responses follow a consistent structure:

```json
{
  "status": "success",
  "data": [...],
  "error": null
}
```

---

## 🌐 Example API Endpoint

### Weather-Based Activity Recommendations

**Endpoint**:  
`GET /api/weather?city=London&countryCode=GB`

**Query Parameters**:
- `city` (required): The name of the city (e.g., `London`).
- `countryCode` (required): The ISO 3166-1 alpha-2 country code (e.g., `GB`).

**Response**:
```json
{
  "status": "success",
  "data": [
    { "activity": "surfing", "score": 2 },
    { "activity": "outdoorSightseeing", "score": 2 },
    { "activity": "indoorSightseeing", "score": 1 },
    { "activity": "skiing", "score": 1 }
  ],
  "error": null
}
```

---

## 🚀 Future Extensibility

### Adding New Activities
To add a new activity:
1. Create a new class that extends the `Activity` base class.
2. Implement the `isSuitable` method with the activity's specific suitability logic.
3. Add the new activity to the `scoreActivities` function.

Example:
```typescript
export class Hiking extends Activity {
  name = 'hiking';

  isSuitable({ maxTemp, rain }: { maxTemp: number; rain: number }): boolean {
    return maxTemp >= 10 && maxTemp <= 25 && rain === 0;
  }
}
```

---

## 🛠️ Installation and Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:godswillaniakor/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

---

## 🧪 Testing

- The project includes unit tests for all core functionality, including:
  - Activity scoring logic.

Run the tests with:
```bash
npm test
```

---

## ❌ Omitted Features

### Express-Validator
- **Why it was omitted**: The current implementation focuses on simplicity and does not require complex input validation. However, adding `express-validator` in the future would be straightforward if input validation becomes necessary.

### City and Country Code Retrieval Endpoint
- **Why it was omitted**: The city and country code data is currently hardcoded in the frontend. A dedicated endpoint can be added in the future if dynamic retrieval is required.

### `.env` File for Configuration
- **Why it was omitted**: The current implementation uses hardcoded values for simplicity. Using a `.env` file for configuration (e.g., `PORT`, `API_URL`) can be added in the future for better flexibility and security.

### Unit Tests
- **Why it was omitted**: More unit tests could have been added to cover edge cases, but time constraints limited the scope.

### Integration Tests
- **Why it was omitted**: Integration tests to validate the interaction between controllers, services, and external APIs were not implemented due to time constraints. These can be added in the future to ensure end-to-end reliability.

### Caching
- **Why it was omitted**: Caching mechanisms (e.g., Redis or in-memory caching) were not implemented to optimize repeated requests for the same weather data. This can be added in the future to improve performance and reduce API calls to external services.

### API Documentation
- **Why it was omitted**: Comprehensive API documentation (e.g., using Swagger or Postman collections) was not included. This can be added in the future to make the API easier to understand and use for frontend/external developers.

---

## 🤖 Leveraging AI in Development

- **ChatGPT** was used to scaffold the project, including:
  - Setting up **Express.js** with **TypeScript**.
  - Configuring **Dependency Injection (DI)** with `tsyringe`.
  - Implementing **AsyncLocalStorage** for request-scoped logging.
- AI assistance accelerated development by providing boilerplate code and architectural suggestions.
- Used it also to generate the Readme with Co-pilot, and I added some changes to it.
- AI assistance helped me with the logic for each activity.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.