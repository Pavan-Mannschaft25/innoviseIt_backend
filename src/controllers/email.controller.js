// const asyncHandler = require("../utils/asyncHandler");
// const ApiResponse = require("../utils/ApiResponse");
// const service = require("../services/email.service");

// exports.getAll = asyncHandler(async (req, res) => {
//   const data = await service.getAll();

//   res.json(new ApiResponse(200, "Emails fetched successfully", data));
// });

// exports.getById = asyncHandler(async (req, res) => {
//   const data = await service.getById(req.params.id);

//   res.json(new ApiResponse(200, "Email fetched successfully", data));
// });

// exports.create = asyncHandler(async (req, res) => {
//   const id = await service.create(req.body);

//   res
//     .status(201)
//     .json(new ApiResponse(201, "Email log created successfully", { id }));
// });

// exports.update = asyncHandler(async (req, res) => {
//   await service.update(req.params.id, req.body);

//   res.json(new ApiResponse(200, "Email updated successfully"));
// });

// exports.remove = asyncHandler(async (req, res) => {
//   await service.remove(req.params.id);

//   res.json(new ApiResponse(200, "Email deleted successfully"));
// });

// exports.send = asyncHandler(async (req, res) => {
//   const result = await emailService.sendEmail(req.body);

//   res.status(200).json(new ApiResponse(200, "Email sent successfully", result));
// });

// exports.sendTestEmail = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   await service.sendEmail({
//     to: email,

//     subject: "Application Received",

//     template: "application-submitted",

//     data: {
//       first_name: "Pavan",

//       job_title: "Senior React Developer",

//       career_url: "https://careers.innovise-it.com",
//     },
//   });

//   res.json(new ApiResponse(200, "Test email sent successfully"));
// });

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const service = require("../services/email.service");

// exports.getAll = asyncHandler(async (req, res) => {
//   const data = await service.getAll();

//   res.json(new ApiResponse(200, "Emails fetched successfully", data));
// });
exports.getAll = asyncHandler(async (req, res) => {
  const data = await service.getAll(req.query);

  res.json(
    new ApiResponse(
      200,

      "Emails fetched successfully",

      data,
    ),
  );
});

exports.getById = asyncHandler(async (req, res) => {
  const data = await service.getById(req.params.id);

  res.json(new ApiResponse(200, "Email fetched successfully", data));
});

exports.create = asyncHandler(async (req, res) => {
  const id = await service.create(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Email log created successfully", { id }));
});

exports.update = asyncHandler(async (req, res) => {
  await service.update(req.params.id, req.body);

  res.json(new ApiResponse(200, "Email updated successfully"));
});

exports.remove = asyncHandler(async (req, res) => {
  await service.remove(req.params.id);

  res.json(new ApiResponse(200, "Email deleted successfully"));
});

exports.send = asyncHandler(async (req, res) => {
  const result = await service.sendEmail(req.body);

  res.json(new ApiResponse(200, "Email sent successfully", result));
});

exports.resend = asyncHandler(async (req, res) => {
  const result = await service.resendEmail(req.params.id);

  res.json(
    new ApiResponse(
      200,

      result.message,
    ),
  );
});

exports.sendTestEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await service.sendEmail({
    recipient: email,
    subject: "Application Received",
    template: "application-submitted",
    data: {
      first_name: "Pavan",
      job_title: "Senior React Developer",
      career_url: "https://careers.innovise-it.com",
    },
    sent_by: 1,
  });

  res.json(new ApiResponse(200, "Test email sent successfully"));
});
