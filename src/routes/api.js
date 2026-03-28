const express = require("express");
const { getComplaints, submitComplaint } = require("../services/complaintService");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

router.get("/complaints", async (_req, res) => {
  try {
    const complaints = await getComplaints();
    res.json({ complaints });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/complaints", async (req, res) => {
  try {
    const complaint = await submitComplaint(req.body);
    res.status(201).json({ complaint });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
