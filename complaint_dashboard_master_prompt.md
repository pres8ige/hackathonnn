# 🚀 MASTER PROMPT
## Unified Customer Complaint Communication Dashboard
### Gen-AI Powered Complaint Intelligence & Operations Platform for Banks / Financial Institutions

---

> **Your role:** Act as a Senior Full Stack Engineer, Product Architect, UI/UX Engineer, AI Systems Integrator, and Hackathon MVP Strategist. Build a demo-ready hackathon project with strong visuals, realistic workflows, clean architecture, modular scalable code, and clear AI-powered features. This is not a toy app — build it like a high-quality startup MVP for judges, investors, and technical reviewers.

---

## 1. PRODUCT VISION

Build a **Unified Complaint Management Dashboard** that aggregates customer complaints from multiple channels into one centralized AI-powered platform.

The system should help banks:

- Collect complaints from all channels
- Understand them automatically using NLP + GenAI
- Detect duplicate/related complaints
- Prioritize complaints intelligently
- Assist agents with AI-generated summaries and responses
- Track SLA and escalation
- Generate trends and root-cause insights
- Provide a clean, modern dashboard UI

> This is NOT just a complaint table. This should feel like an **AI operations command center** for complaint handling.

---

## 2. CORE PROBLEM TO SOLVE

Banks currently receive complaints across: email, call center, chatbot, mobile app, website forms, social media, and internal CRM / branch systems.

**Problems today:**

- Complaints are siloed across systems
- Agents do manual classification
- Same complaint may appear multiple times
- Customers repeat themselves across channels
- SLA breaches happen due to lack of visibility
- Managers lack trend insights
- There is no unified AI-assisted complaint intelligence layer

**This project solves all of that.**

---

## 3. WHAT THE PRODUCT MUST DO

The product should simulate / implement the following full complaint lifecycle:

### A. Complaint Ingestion / Aggregation

Support complaints coming from multiple sources. For MVP, simulate or support:

- Email
- Call Transcript
- Chatbot
- Mobile App
- Social Media
- CRM / Branch

**Requirements:**

- Each complaint must store: source/channel, timestamp, customer info, raw message, product context, and status
- Support adding mock complaint data manually or via seed data
- Optionally allow uploading complaint CSV / JSON / sample records

### B. Complaint Normalization

Before AI processing:

- Clean complaint text
- Normalize wording
- Optionally strip noise / metadata
- Support raw complaint + processed complaint version

This should be structured in backend service logic.

### C. NLP / AI Complaint Intelligence Engine

For each complaint, the system should automatically generate:

**1. Complaint Category**
UPI / Payments, Card Issue, Loan Issue, KYC / Account Verification, Fraud / Unauthorized Transaction, Account Access, Mobile Banking, Internet Banking, Customer Service, Charges / Fees

**2. Product Detection**
Savings Account, Current Account, Credit Card, Debit Card, UPI, Mobile Banking, Loan, Insurance, Net Banking

**3. Severity Detection**
Low, Medium, High, Critical

Severity should be influenced by: complaint language, mention of money loss / fraud / blocked access, repeated complaint behavior, sentiment

**4. Sentiment Analysis**
Positive, Neutral, Frustrated, Angry, Critical

**5. Key Issue Extraction**
- What exactly went wrong
- What the customer wants
- Important entities (date, product, amount, issue type)

**6. AI Summary**
Generate a concise agent-facing complaint summary, e.g.:
> "Customer reports failed UPI payment with debited amount and requests refund confirmation."

**7. Suggested Next Best Action**
Examples: escalate to payments team, verify failed transaction logs, initiate refund workflow, request KYC verification, check card block status

**8. Suggested Resolution Template / Draft Response**
Generate a professional support response draft that an agent can review and send.

> ⚠️ Drafts should be editable. Display clearly as "AI Suggested Draft". Do NOT present it as auto-sent without review.

---

## 4. DUPLICATE / RELATED COMPLAINT DETECTION

This is a **key innovation feature**.

Build logic to detect:

- Duplicate complaints from same customer
- Semantically similar complaints across customers
- Related complaints that may indicate a broader incident

**Example cluster:**
- "UPI payment failed"
- "money deducted but transaction failed"
- "QR payment failed and amount debited"

These should be linked under duplicate complaint groups / related issue clusters.

**UI should show:**
- "Possible Duplicate"
- "Related Complaints Found"
- "Cluster ID / Incident Group"

**Bonus:** Allow clicking related complaints from the detail page.

**Implementation options:** embedding similarity, semantic similarity, fuzzy matching, or simple MVP similarity logic — structure code to be extensible.

---

## 5. 360-DEGREE COMPLAINT VIEW

Each complaint should have a detailed page / modal / drawer showing a complete complaint profile:

- Complaint ID
- Customer name / identifier
- Complaint source/channel
- Date/time
- Complaint category & product involved
- Sentiment & Severity
- Current status & Assigned agent/team
- SLA timer / due time & Escalation level
- AI summary & Key extracted issue
- Full raw complaint text & Processed complaint text (optional)
- Previous interactions / communication history
- Related / duplicate complaints
- Suggested next best action
- AI-generated response draft
- Internal notes section
- Action buttons: assign / escalate / resolve / reply

> This should feel like a **support ops command center view**, not a basic CRUD page.

---

## 6. COMMUNICATION HISTORY / TIMELINE

For each complaint, show the entire interaction history in a clean timeline UI:

- Complaint created
- Customer emailed
- Customer called support
- Agent replied
- Complaint escalated
- SLA warning triggered
- Complaint resolved

> This is important because the product's value is showing a **unified communication history across channels**.

---

## 7. SLA TRACKING

Build SLA logic into the product.

**Requirements:**

- Each complaint gets an SLA target time based on category / severity
- System calculates: time elapsed, time remaining, SLA breach risk
- Visual SLA states: **On Track**, **Near Breach**, **Breached**

**Visible in:** dashboard cards, complaint list, complaint detail view.

**Bonus:** Add SLA alert badges / warning chips.

---

## 8. ESCALATION MANAGEMENT

Support escalation workflows.

**Escalation levels:**
- L1 → L2 → Nodal Officer → Compliance → Fraud Team

**Triggers:**
- Critical severity
- Fraud-related complaint
- SLA risk / breach
- Repeated unresolved complaint

**UI should support:** escalation status, escalation level, escalation reason, escalation history.

---

## 9. DASHBOARD / ANALYTICS *(VERY IMPORTANT)*

The landing dashboard must be visually impressive and highly informative.

**Top KPIs:**
- Total Complaints, Open Complaints, Resolved Complaints
- Escalated Complaints, SLA Breaches, Avg Resolution Time

**Charts / Insights:**
- Complaint Volume Over Time
- Complaints by Category, Product, Channel
- Sentiment Distribution, Severity Distribution, SLA Status Distribution

**Smart AI Insights Panel:**
- "UPI complaints have increased 32% this week"
- "High-severity fraud complaints spiked in the last 24 hours"
- "Repeated debit failure complaints indicate a possible payment gateway issue"

**Recent Complaints Table:** customer, category, severity, status, SLA, assigned team.

> This dashboard should look **hackathon-winning and modern**.

---

## 10. ROOT CAUSE / TREND ANALYSIS

High-value manager/admin feature. The system should identify:

- Emerging complaint trends
- Repeated issue clusters
- Possible systemic causes

**Examples:**
- "Most complaints in last 48h are related to UPI debit failures"
- "Spike in KYC verification issues after app update"
- "Multiple complaints tied to loan disbursement delay in one region"

Implementation: heuristic + AI-generated insight. Feature appears in dashboard insight cards, analytics section, and incident / cluster summaries.

---

## 11. REGULATORY / REPORTING CAPABILITY

Add a reporting module or export-friendly data views for:

- Complaints by category and status
- Escalations and SLA performance
- Complaint aging and resolution summary

**Support:** export to CSV / JSON (if feasible), clean manager/admin view.

---

## 12. USER ROLES *(IMPORTANT)*

Design with role-based thinking even if MVP uses mocked auth.

| Role | Capabilities |
|---|---|
| **Agent** | View assigned complaints, review AI suggestions, respond / resolve / escalate |
| **Manager / Supervisor** | Team dashboard, escalations, trends / SLA performance, assign complaints |
| **Admin / Compliance** | Access reporting, view all complaints, review regulatory metrics |

Structure code and UI for role-based extensibility.

---

## 13. UI / UX EXPECTATIONS

**Design style:** Modern, clean, enterprise SaaS feel, not overdesigned, dark/light mode optional, premium dashboard aesthetic.

**Visual expectations:**
- Beautiful cards, clean charts, thoughtful spacing
- Professional typography
- Badge system for severity / sentiment / SLA / escalation
- Excellent detail view UX
- Responsive layout

**Key screens to build:**
1. Login / entry (optional simple)
2. Main dashboard
3. Complaint list / queue
4. Complaint detail page / drawer
5. AI insights / trends page
6. Reports page
7. Incident / duplicate clusters page (if possible)

> This should be strong enough to **screen-record for hackathon video**.

---

## 14. MVP PRIORITIZATION *(IMPORTANT)*

| Priority | Features |
|---|---|
| **MUST HAVE** | Dashboard, complaint list, complaint detail view, AI categorization / summary / sentiment / severity, AI draft response, SLA tracking, duplicate/related complaint indication, analytics cards / charts |
| **SHOULD HAVE** | Escalation workflows, communication timeline, incident / cluster grouping, reporting page |
| **NICE TO HAVE** | Role-based auth, CSV import/export, live AI chat assistant, compliance reporting templates |

> Do not get stuck building unnecessary backend complexity. The goal is a hackathon MVP that **feels complete**.

---

## 15. AI / LLM INTEGRATION EXPECTATIONS

Structure AI as clean services/modules:

```
classifyComplaint()
detectSentiment()
detectSeverity()
extractKeyIssue()
generateSummary()
generateDraftResponse()
suggestNextAction()
findRelatedComplaints()
generateTrendInsights()
```

Structure for extensibility to connect to: OpenAI, Gemini, Claude, local models, embeddings/vector DB.

**Important:** Separate prompt logic from UI. Separate AI service logic from route handlers.

---

## 16. DATA MODEL / DOMAIN THINKING

### Complaint

| Field | Description |
|---|---|
| `id` | Unique identifier |
| `customerId` / `customerName` | Customer reference |
| `channel` | Source channel |
| `rawText` | Original complaint text |
| `normalizedText` | Cleaned/processed text |
| `category` | AI-detected category |
| `product` | AI-detected product |
| `severity` | Low / Medium / High / Critical |
| `sentiment` | Detected sentiment |
| `keyIssue` | Extracted core issue |
| `aiSummary` | AI-generated summary |
| `suggestedAction` | Next best action |
| `aiDraftResponse` | Draft reply |
| `status` | Current status |
| `assignedTo` | Agent/team |
| `escalationLevel` / `escalationReason` | Escalation info |
| `slaDueAt` | SLA deadline |
| `createdAt` / `updatedAt` | Timestamps |
| `clusterId` / `duplicateGroupId` | Grouping reference |

### CommunicationEvent / TimelineEntry

`complaintId`, `type`, `message`, `actor`, `timestamp`

### ComplaintCluster / Incident

`id`, `title`, `issueType`, `relatedComplaintIds`, `probableRootCause`, `trendSummary`

### User *(if needed)*

`id`, `name`, `role`

---

## 17. CODE QUALITY EXPECTATIONS

Write code like a senior engineer:

- Modular folder structure
- Reusable UI components
- Typed interfaces / schemas where applicable
- Clean service/controller separation
- Maintainable naming
- Avoid spaghetti code and hacky inline logic
- Comment only where useful, not excessively
- Create mock/sample data if backend is not fully wired

If some functionality is simulated for MVP, do it **elegantly**.

---

## 18. DEMO / HACKATHON OPTIMIZATION

Build with demo value in mind. Optimize for these **"wow moments"**:

| Wow Moment | What to Show |
|---|---|
| **#1** | Upload/add a complaint → instantly see category, sentiment, severity, AI summary, draft response |
| **#2** | Open complaint detail → full 360° profile, communication timeline, SLA timer, suggested action |
| **#3** | Duplicate / related complaint detection in action |
| **#4** | Trend insight: "UPI complaints spiked 32%" |
| **#5** | Dashboard analytics and root cause panel |

Build the product so these demo flows are **smooth and visually strong**.

---

## 19. WHAT I WANT FROM YOU AS THE CODING AI

**Execution-oriented approach — do not describe ideas vaguely.**

| Phase | Task |
|---|---|
| **Phase 1** | Understand existing codebase / project structure |
| **Phase 2** | Propose the best architecture for integrating into current setup |
| **Phase 3** | Generate necessary files, components, services, pages, APIs, and mock data |
| **Phase 4** | Iteratively improve: UI, UX, AI logic, charts, complaint workflows, demo polish |
| **Phase 5** | Help make it hackathon presentation-ready |

---

## 20. HOW YOU SHOULD RESPOND

When helping build this:

- Be decisive, think like a product engineer
- Suggest the best implementation path
- Do not overcomplicate if MVP path is better
- If something should be mocked for speed, say so and implement cleanly
- If something can be made more impressive visually, do it
- If architecture can be improved, suggest it
- If UX can be improved, improve it proactively

When generating code:

- Produce complete files when needed
- Clearly state where each file belongs
- Preserve consistency with the existing project
- Do not break existing code
- If refactoring is needed, explain briefly then implement

---

## 21. START NOW

Begin by:

1. Analyzing the current project structure and existing files
2. Identifying what already exists that can be reused
3. Proposing the best implementation plan for this complaint dashboard
4. Breaking the work into build phases

Then begin implementing the highest-impact MVP first, starting with:

- Overall architecture
- Required pages/components
- Data model
- AI service design
- Dashboard plan
- Complaint detail view plan

**Then start building.**

---

*Document prepared for: Antigravity Hackathon Submission*
