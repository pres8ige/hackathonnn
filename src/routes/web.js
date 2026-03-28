const express = require("express");
const { getComplaints, getDashboardMetrics } = require("../services/complaintService");

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const complaints = await getComplaints();
    const dashboardMetrics = getDashboardMetrics(complaints);
    res.render("dashboard", {
      complaints,
      dashboardMetrics,
      errorMessage: ""
    });
  } catch (error) {
    res.render("dashboard", {
      complaints: [],
      dashboardMetrics: getDashboardMetrics([]),
      errorMessage: error.message
    });
  }
});

module.exports = router;
