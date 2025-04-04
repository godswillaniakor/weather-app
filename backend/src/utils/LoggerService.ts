import winston from "winston";
import { getRequestId } from "./requestContext";

export default class LoggerService {
  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  setContext(context: string) {
    this.context = context;
  }

  private formatMessage(message: string): string {
    const requestId = getRequestId();
    return [
      requestId ? `[req:${requestId}]` : "",
      this.context ? `[${this.context}]` : "",
      message,
    ]
      .filter(Boolean)
      .join(" ");
  }

  info(message: string) {
    winstonLogger.info(this.formatMessage(message));
  }

  error(message: string, error?: Error) {
    winstonLogger.error(
      this.formatMessage(`${message}${error ? " - " + error.message : ""}`)
    );
  }

  warn(message: string) {
    winstonLogger.warn(this.formatMessage(message));
  }

  debug(message: string) {
    winstonLogger.debug(this.formatMessage(message));
  }
}

const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});
