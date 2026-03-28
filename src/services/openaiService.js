const OpenAI = require("openai");
const env = require("../config/env");

const client = env.aiApiKey
  ? new OpenAI({
      apiKey: env.aiApiKey,
      ...(env.aiBaseUrl ? { baseURL: env.aiBaseUrl } : {})
    })
  : null;

function normalizeWhitespace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeSentiment(value, fallback = "negative") {
  const normalized = normalizeWhitespace(value).toLowerCase();

  if (["positive", "neutral", "negative", "very_angry"].includes(normalized)) {
    return normalized;
  }

  if (/(very angry|furious|enraged|outraged|violent|very_angry)/.test(normalized)) {
    return "very_angry";
  }

  if (/(angry|upset|frustrated|negative|bad|hostile)/.test(normalized)) {
    return "negative";
  }

  if (/(neutral|mixed|unclear|unknown)/.test(normalized)) {
    return "neutral";
  }

  if (/(positive|happy|satisfied|good)/.test(normalized)) {
    return "positive";
  }

  return fallback;
}

function normalizeSeverity(value, fallback = "medium") {
  const normalized = normalizeWhitespace(value).toLowerCase();

  if (["low", "medium", "high", "critical"].includes(normalized)) {
    return normalized;
  }

  if (/(critical|emergency|urgent|violent|danger)/.test(normalized)) {
    return "critical";
  }

  if (/(high|serious|major|severe)/.test(normalized)) {
    return "high";
  }

  if (/(low|minor|small)/.test(normalized)) {
    return "low";
  }

  return fallback;
}

function normalizeComplaintType(value, fallback = "other_issue") {
  const normalized = normalizeWhitespace(value).toLowerCase();

  if (
    [
      "payment_issue",
      "account_issue",
      "loan_issue",
      "fraud_issue",
      "service_issue",
      "technical_issue",
      "other_issue"
    ].includes(normalized)
  ) {
    return normalized;
  }

  if (/(payment|transaction|deducted|failed|refund|charged)/.test(normalized)) {
    return "payment_issue";
  }

  if (/(account|login|kyc|profile|blocked|locked)/.test(normalized)) {
    return "account_issue";
  }

  if (/(loan|emi|interest|borrow|repayment)/.test(normalized)) {
    return "loan_issue";
  }

  if (/(fraud|scam|phishing|unauthorized|stolen)/.test(normalized)) {
    return "fraud_issue";
  }

  if (/(service|support|staff|branch|agent|behavior|rude)/.test(normalized)) {
    return "service_issue";
  }

  if (/(technical|app|server|internet banking|bug|crash|otp)/.test(normalized)) {
    return "technical_issue";
  }

  return fallback;
}

function normalizeProductType(value, fallback = "other") {
  const normalized = normalizeWhitespace(value).toLowerCase();

  if (
    [
      "upi",
      "credit_card",
      "savings_account",
      "internet_banking",
      "loan_account",
      "debit_card",
      "wallet",
      "other"
    ].includes(normalized)
  ) {
    return normalized;
  }

  if (/\bupi\b/.test(normalized)) {
    return "upi";
  }

  if (/(credit card|creditcard)/.test(normalized)) {
    return "credit_card";
  }

  if (/(savings account|saving account)/.test(normalized)) {
    return "savings_account";
  }

  if (/(internet banking|net banking|online banking)/.test(normalized)) {
    return "internet_banking";
  }

  if (/(loan|emi)/.test(normalized)) {
    return "loan_account";
  }

  if (/(debit card|atm card)/.test(normalized)) {
    return "debit_card";
  }

  if (/(wallet)/.test(normalized)) {
    return "wallet";
  }

  return fallback;
}

function inferSentiment(message) {
  const text = normalizeWhitespace(message).toLowerCase();

  if (/(fraud|scam|stolen|hit|threat|abuse|harass|worst|terrible|furious|cheat)/.test(text)) {
    return "very_angry";
  }

  if (/(hate|angry|bad|delay|issue|problem|deducted|failed|rude)/.test(text)) {
    return "negative";
  }

  if (/(okay|fine|average|neutral|not sure)/.test(text)) {
    return "neutral";
  }

  return "negative";
}

function inferSeverity(message) {
  const text = normalizeWhitespace(message).toLowerCase();

  if (/(hit|assault|threat|abuse|unsafe|danger|emergency|violence)/.test(text)) {
    return "critical";
  }

  if (/(fraud|scam|stolen|charged twice|damaged|broken|never arrived|missing|refund)/.test(text)) {
    return "high";
  }

  if (/(late|delay|rude|issue|problem|wrong|dont like|don't like|not happy)/.test(text)) {
    return "medium";
  }

  return "low";
}

function inferComplaintType(message) {
  const text = normalizeWhitespace(message).toLowerCase();

  if (/(fraud|scam|phishing|unauthorized|stolen|cheat)/.test(text)) {
    return "fraud_issue";
  }

  if (/(payment|transaction|deducted|refund|charged|sent money|money deducted)/.test(text)) {
    return "payment_issue";
  }

  if (/(account|login|kyc|blocked|locked|password|profile)/.test(text)) {
    return "account_issue";
  }

  if (/(loan|emi|interest|repayment|borrow)/.test(text)) {
    return "loan_issue";
  }

  if (/(app|server|otp|technical|bug|crash|internet banking|net banking)/.test(text)) {
    return "technical_issue";
  }

  if (/(staff|support|service|agent|branch|rude|behavior)/.test(text)) {
    return "service_issue";
  }

  return "other_issue";
}

function inferProductType(message) {
  const text = normalizeWhitespace(message).toLowerCase();

  if (/\bupi\b/.test(text)) {
    return "upi";
  }

  if (/(credit card|creditcard)/.test(text)) {
    return "credit_card";
  }

  if (/(savings account|saving account)/.test(text)) {
    return "savings_account";
  }

  if (/(internet banking|net banking|online banking)/.test(text)) {
    return "internet_banking";
  }

  if (/(loan|emi)/.test(text)) {
    return "loan_account";
  }

  if (/(debit card|atm card)/.test(text)) {
    return "debit_card";
  }

  if (/(wallet)/.test(text)) {
    return "wallet";
  }

  return "other";
}

function buildSummary(message) {
  const normalized = normalizeWhitespace(message);
  const shortMessage =
    normalized.length > 180 ? `${normalized.slice(0, 177)}...` : normalized;

  return `Customer reports: ${shortMessage}`;
}

function buildReply(message, severity, complaintType) {
  const normalized = normalizeWhitespace(message);

  if (severity === "critical") {
    return "Thank you for reporting this. We have flagged it as urgent and our team will review the incident immediately, prioritize your safety, and follow up with next steps as quickly as possible.";
  }

  if (severity === "high") {
    return "Thank you for sharing this complaint. We have logged the issue for priority review and our team will investigate the problem, verify the relevant details, and contact you with a resolution update soon.";
  }

  if (/^(hello|hi|hey)\b/i.test(normalized)) {
    return "Thank you for reaching out. Please share the specific issue you want us to review, including what happened and what resolution you expect, and our team will take it forward.";
  }

  if (complaintType === "payment_issue") {
    return "Thank you for reporting this payment issue. We have logged the transaction concern and our team will verify the payment status, trace the affected transaction, and update you with the resolution.";
  }

  if (complaintType === "fraud_issue") {
    return "Thank you for reporting this fraud concern. We have marked it for urgent investigation and our team will review the suspicious activity, secure the affected account details, and contact you with immediate next steps.";
  }

  return "Thank you for sharing this complaint. We have logged it, reviewed the key issue, and our team will follow up with a resolution as quickly as possible.";
}

function isGenericAssistantText(value) {
  const text = normalizeWhitespace(value).toLowerCase();

  return (
    !text ||
    /(how can i assist you today|i'?m here to help|thanks for reaching out|hello[,!]? thanks)/.test(
      text
    )
  );
}

function buildFallback(message) {
  const complaintType = inferComplaintType(message);
  const productType = inferProductType(message);
  const severity = inferSeverity(message);
  const sentiment = inferSentiment(message);

  return {
    summary: buildSummary(message),
    reply: buildReply(message, severity, complaintType),
    complaintType,
    productType,
    sentiment,
    severity
  };
}

function parseTextResponse(rawContent, originalMessage) {
  const cleaned = normalizeWhitespace(rawContent);
  const fallback = buildFallback(originalMessage);

  if (!cleaned) {
    return fallback;
  }

  try {
    const payload = JSON.parse(cleaned);
    if (payload && payload.summary && payload.reply) {
      const summary = normalizeWhitespace(payload.summary);
      const reply = normalizeWhitespace(payload.reply);

      return {
        summary: isGenericAssistantText(summary) ? fallback.summary : summary,
        reply: isGenericAssistantText(reply) ? fallback.reply : reply,
        complaintType: normalizeComplaintType(payload.complaintType, fallback.complaintType),
        productType: normalizeProductType(payload.productType, fallback.productType),
        sentiment: normalizeSentiment(payload.sentiment, fallback.sentiment),
        severity: normalizeSeverity(payload.severity, fallback.severity)
      };
    }
  } catch (_error) {
    // Local models do not always honor JSON-only instructions.
  }

  const lines = cleaned
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let summary = lines[0] || "";
  let reply = lines.slice(1).join(" ");

  if (!reply) {
    reply = cleaned;
  }

  if (!summary) {
    summary = fallback.summary;
  }

  if (isGenericAssistantText(summary)) {
    summary = fallback.summary;
  }

  if (isGenericAssistantText(reply)) {
    reply = fallback.reply;
  }

  return {
    summary: summary.length > 220 ? `${summary.slice(0, 217).trim()}...` : summary,
    reply,
    complaintType: fallback.complaintType,
    productType: fallback.productType,
    sentiment: fallback.sentiment,
    severity: fallback.severity
  };
}

async function analyzeComplaint(message) {
  if (!client) {
    return buildFallback(message);
  }

  try {
    const response = await client.chat.completions.create({
      model: env.aiModel,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You analyze customer complaints for a financial services dashboard. Return valid JSON with keys summary, reply, complaintType, productType, sentiment, and severity. summary must be one sentence describing the issue. reply must be professional, empathetic, and actionable. complaintType must be one of payment_issue, account_issue, loan_issue, fraud_issue, service_issue, technical_issue, other_issue. productType must be one of upi, credit_card, savings_account, internet_banking, loan_account, debit_card, wallet, other. sentiment must be one of positive, neutral, negative, very_angry. severity must be one of low, medium, high, critical."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const rawContent = response.choices?.[0]?.message?.content || "";
    return parseTextResponse(rawContent, message);
  } catch (error) {
    console.error(
      `AI analysis failed for provider ${env.aiProvider || "unknown"}: ${error.message}`
    );
    return buildFallback(message);
  }
}

module.exports = {
  analyzeComplaint
};
