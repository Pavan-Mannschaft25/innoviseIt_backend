const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const emailService = require("../services/email.service");

exports.sendTestEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await emailService.sendEmail({
    to: email,

    subject: "Application Received",

    template: "application-submitted",

    data: {
      first_name: "Pavan",

      job_title: "Senior React Developer",

      career_url: "https://careers.innovise-it.com",
    },
  });

  res.json(new ApiResponse(200, "Test email sent successfully"));
});
