const path = require("path");
const express = require("express");
const env = require("./config/env");
const apiRoutes = require("./routes/api");
const webRoutes = require("./routes/web");
const complaintRepository = require("./repositories/complaintRepository");

async function startServer() {
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(process.cwd(), "public")));

  app.use("/", webRoutes);
  app.use("/api", apiRoutes);

  try {
    await complaintRepository.ensureTable();
  } catch (error) {
    console.error("Failed to connect to MySQL or initialize schema.");
    console.error(error.message);
  }

  app.listen(env.port, () => {
    console.log(`Complaint dashboard running on http://localhost:${env.port}`);
  });
}

module.exports = {
  startServer
};
