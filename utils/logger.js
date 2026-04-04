const { createLogger, format, transports } = require("winston");
const path = require("path");
const fs = require("fs");

// Create logs folder automatically if not exists
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create logger
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] : ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // show in terminal
    new transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
  ],
});

module.exports = logger;