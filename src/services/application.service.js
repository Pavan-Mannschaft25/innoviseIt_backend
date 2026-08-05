// const emailService = require("./email.service");
// const applicationSubmitted = require("../templates/applicationSubmitted");
// const newApplication = require("../templates/newApplication");
// const applicationRepository = require("../repositories/application.repository");
// const jobRepository = require("../repositories/job.repository");
// const ApiError = require("../utils/ApiError");

// const create = async (data) => {
//   const job = await jobRepository.findById(data.job_id);

//   if (!job) {
//     throw new ApiError(404, "Job not found");
//   }

//   return await applicationRepository.create(data);

// };

// const getAll = async (query) => {
//   return await applicationRepository.findAll(query);
// };

// const getById = async (id) => {
//   const application = await applicationRepository.findById(id);

//   if (!application) {
//     throw new ApiError(404, "Application not found");
//   }

//   return application;
// };

// const updateStatus = async (id, status) => {
//   const application = await applicationRepository.findById(id);

//   if (!application) {
//     throw new ApiError(404, "Application not found");
//   }

//   await applicationRepository.updateStatus(id, status);
// };

// const remove = async (id) => {
//   const application = await applicationRepository.findById(id);

//   if (!application) {
//     throw new ApiError(404, "Application not found");
//   }

//   await applicationRepository.remove(id);
// };

// module.exports = {
//   create,
//   getAll,
//   getById,
//   updateStatus,
//   remove,
// };

const applicationSubmitted = require("../templates/applicationSubmitted");
const newApplication = require("../templates/newApplication");
const jobRepository = require("../repositories/job.repository");
const applicationRepository = require("../repositories/application.repository");
const emailService = require("./email.service");

const ApiError = require("../utils/ApiError");

// const create = async (data) => {
//   const job = await jobRepository.findById(data.job_id);

//   if (!job) {
//     throw new ApiError(404, "Job not found");
//   }

//   const applicationId = await applicationRepository.create(data);

//   await emailService.sendEmail({
//     to: data.email,
//     subject: "Application Received - Innovise IT Careers",
//     html: applicationSubmitted(
//       `${data.first_name} ${data.last_name}`,
//       job.title,
//     ),
//   });

//   await emailService.sendEmail({
//     to: process.env.HR_EMAIL,
//     subject: "New Job Application Received",
//     html: newApplication(`${data.first_name} ${data.last_name}`, job.title),
//   });

//   return applicationId;
// };
// const create = async (application) => {
//   const id = await applicationRepository.create(application);

//   const job = await jobRepository.findTitleById(application.job_id);

//   await emailService.sendEmail({
//     to: application.email,

//     subject: "Application Received - Innovise IT",

//     template: "application-submitted",

//     data: {
//       first_name: application.first_name,

//       job_title: job.title,

//       career_url: "https://careers.innovise-it.com",
//     },
//   });

//   return id;
// };

const create = async (application) => {
  console.log("========== New Application ==========");
  console.log(application);

  // Save application
  const id = await applicationRepository.create(application);

  console.log("✅ Application saved with ID:", id);

  // Get Job Title
  const job = await jobRepository.findTitleById(application.job_id);

  if (!job) {
    throw new Error("Job not found");
  }

  console.log("✅ Job Found:", job.title);

  /*
  ----------------------------------------
  Candidate Confirmation Email
  ----------------------------------------
  */

  try {
    await emailService.sendEmail({
      to: application.email,

      subject: "Application Received - Innovise IT",

      template: "application-submitted",

      data: {
        first_name: application.first_name,

        job_title: job.title,

        career_url: "https://careers.innovise-it.com",
      },
    });

    console.log("✅ Candidate email sent");
  } catch (err) {
    console.error("Candidate Email Error:", err.message);
  }

  /*
  ----------------------------------------
  HR Notification Email
  ----------------------------------------
  */

  try {
    await emailService.sendEmail({
      to: process.env.HR_EMAIL,

      subject: `New Application - ${job.title}`,

      template: "new-application",

      data: {
        full_name: `${application.first_name} ${application.last_name}`,

        email: application.email,

        phone: application.phone,

        experience: application.experience,

        job_title: job.title,

        admin_url: "http://localhost:5173/admin/applications",
      },
    });

    console.log("✅ HR notification sent");
  } catch (err) {
    console.error("HR Email Error:", err.message);
  }

  return id;
};

const getAll = async (query) => {
  return await applicationRepository.findAll(query);
};

const getById = async (id) => {
  const application = await applicationRepository.findById(id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  return application;
};

// const updateStatus = async (id, status) => {
//   const application = await applicationRepository.findById(id);

//   if (!application) {
//     throw new ApiError(404, "Application not found");
//   }

//   await applicationRepository.updateStatus(id, status);

//   await emailService.sendEmail({
//     to: application.email,
//     subject: "Application Status Updated",
//     html: statusUpdated(
//       `${application.first_name} ${application.last_name}`,
//       status,
//     ),
//   });
// };
const updateStatus = async (id, status) => {
  const application = await applicationRepository.findById(id);

  if (!application) {
    throw new Error("Application not found");
  }

  await applicationRepository.updateStatus(id, status);

  let message = "";

  switch (status) {
    case "Reviewed":
      message = "Your application has been reviewed by our recruitment team.";
      break;

    case "Interview":
      message =
        "Congratulations! You have been shortlisted for the interview round.";
      break;

    case "Selected":
      message =
        "Congratulations! You have been selected. Our HR team will contact you shortly.";
      break;

    case "Rejected":
      message =
        "Thank you for your interest. We appreciate your time and encourage you to apply for future opportunities.";
      break;

    default:
      message = "Your application status has been updated.";
  }

  try {
    await emailService.sendEmail({
      to: application.email,

      subject: `Application Status Updated - ${status}`,

      template: "application-status",

      data: {
        first_name: application.first_name,

        job_title: application.job_title,

        status,

        message,

        career_url: "https://careers.innovise-it.com",
      },
    });

    console.log("✅ Status email sent");
  } catch (err) {
    console.error("Status Email Error:", err.message);
  }

  return true;
};

const remove = async (id) => {
  const application = await applicationRepository.findById(id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  await applicationRepository.remove(id);
};

module.exports = {
  create,
  getAll,
  getById,
  updateStatus,
  remove,
};
