const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

// Security
app.use(helmet());

// Compression
app.use(compression());

// Logger
app.use(morgan("dev"));

// CORS
app.use(cors());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const healthRoutes = require("./routes/health.routes");
app.use("/api/health", healthRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const departmentRoutes = require("./routes/department.routes");
app.use("/api/departments", departmentRoutes);

const jobRoutes = require("./routes/job.routes");
app.use("/api/jobs", jobRoutes);

const applicationRoutes = require("./routes/application.routes");
app.use("/api/applications", applicationRoutes);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const dashboardRoutes = require("./routes/dashboard.routes");
app.use("/api/dashboard", dashboardRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/api/admins", adminRoutes);

const auditRoutes = require("./routes/audit.routes");
app.use("/api/audit-logs", auditRoutes);

const emailRoutes = require("./routes/email.routes");
app.use("/api/emails", emailRoutes);

const emailTemplateRoutes = require("./routes/emailTemplate.routes");
app.use("/api/email-templates", emailTemplateRoutes);

const interviewRoutes = require("./routes/interview.routes");
app.use("/api/interviews", interviewRoutes);

// Global Error Handler
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;
