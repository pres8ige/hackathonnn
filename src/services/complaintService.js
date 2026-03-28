const complaintRepository = require("../repositories/complaintRepository");
const { analyzeComplaint } = require("./openaiService");

function validateComplaint(input) {
  if (!input.customerName || !input.customerName.trim()) {
    throw new Error("Customer name is required.");
  }

  if (!input.message || !input.message.trim()) {
    throw new Error("Complaint message is required.");
  }
}

async function submitComplaint(input) {
  validateComplaint(input);

  const analysis = await analyzeComplaint(input.message);

  return complaintRepository.createComplaint({
    customerName: input.customerName.trim(),
    email: input.email ? input.email.trim() : "",
    message: input.message.trim(),
    summary: analysis.summary,
    reply: analysis.reply,
    complaintType: analysis.complaintType,
    productType: analysis.productType,
    sentiment: analysis.sentiment,
    severity: analysis.severity,
    status: "reviewed"
  });
}

async function getComplaints() {
  return complaintRepository.listComplaints();
}

function humanizeLabel(value) {
  return String(value || "")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildCounts(items, key) {
  return items.reduce((accumulator, item) => {
    const value = item[key] || "unknown";
    accumulator[value] = (accumulator[value] || 0) + 1;
    return accumulator;
  }, {});
}

function toChartData(counts) {
  return Object.entries(counts)
    .map(([key, count]) => ({
      key,
      label: humanizeLabel(key),
      count
    }))
    .sort((left, right) => right.count - left.count);
}

function getDashboardMetrics(complaints) {
  const total = complaints.length;
  const sentimentCounts = buildCounts(complaints, "sentiment");
  const severityCounts = buildCounts(complaints, "severity");
  const complaintTypeCounts = buildCounts(complaints, "complaintType");
  const productTypeCounts = buildCounts(complaints, "productType");

  return {
    total,
    criticalCount: severityCounts.critical || 0,
    veryAngryCount: sentimentCounts.very_angry || 0,
    paymentIssueCount: complaintTypeCounts.payment_issue || 0,
    sentimentChart: toChartData(sentimentCounts),
    severityChart: toChartData(severityCounts),
    complaintTypeChart: toChartData(complaintTypeCounts),
    productTypeChart: toChartData(productTypeCounts)
  };
}

module.exports = {
  submitComplaint,
  getComplaints,
  getDashboardMetrics
};
