
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Helper function to create a logger with a dynamic name
const createLogger = (name: string = "logs") => {
  const transport = new DailyRotateFile({
    filename: `logs/${name}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  });

  return winston.createLogger({
    level: "info",
    transports: [new winston.transports.Console(), transport],
  });
};

const logger = createLogger();
export default logger;


