const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(__dirname, "../../.env")
];

const envPath = envCandidates.find((candidate) => fs.existsSync(candidate));

if (envPath) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

function readEnv(name, fallback = "") {
  return process.env[name] || fallback;
}

module.exports = {
  port: Number(readEnv("PORT", "3000")),
  mysql: {
    host: readEnv("MYSQL_HOST", "localhost"),
    port: Number(readEnv("MYSQL_PORT", "3306")),
    user: readEnv("MYSQL_USER", "root"),
    password: readEnv("MYSQL_PASSWORD", ""),
    database: readEnv("MYSQL_DATABASE", "complaints_db")
  },
  aiProvider: readEnv("AI_PROVIDER", "openai"),
  aiApiKey: readEnv("AI_API_KEY", readEnv("OPENAI_API_KEY", "")),
  aiBaseUrl: readEnv("AI_BASE_URL", ""),
  aiModel: readEnv("AI_MODEL", readEnv("OPENAI_MODEL", "gpt-4.1-mini"))
};
