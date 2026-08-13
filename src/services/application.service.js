// // // const emailService = require("./email.service");
// // // const applicationSubmitted = require("../templates/applicationSubmitted");
// // // const newApplication = require("../templates/newApplication");
// // // const applicationRepository = require("../repositories/application.repository");
// // // const jobRepository = require("../repositories/job.repository");
// // // const ApiError = require("../utils/ApiError");

// // // const create = async (data) => {
// // //   const job = await jobRepository.findById(data.job_id);

// // //   if (!job) {
// // //     throw new ApiError(404, "Job not found");
// // //   }

// // //   return await applicationRepository.create(data);

// // // };

// // // const getAll = async (query) => {
// // //   return await applicationRepository.findAll(query);
// // // };

// // // const getById = async (id) => {
// // //   const application = await applicationRepository.findById(id);

// // //   if (!application) {
// // //     throw new ApiError(404, "Application not found");
// // //   }

// // //   return application;
// // // };

// // // const updateStatus = async (id, status) => {
// // //   const application = await applicationRepository.findById(id);

// // //   if (!application) {
// // //     throw new ApiError(404, "Application not found");
// // //   }

// // //   await applicationRepository.updateStatus(id, status);
// // // };

// // // const remove = async (id) => {
// // //   const application = await applicationRepository.findById(id);

// // //   if (!application) {
// // //     throw new ApiError(404, "Application not found");
// // //   }

// // //   await applicationRepository.remove(id);
// // // };

// // // module.exports = {
// // //   create,
// // //   getAll,
// // //   getById,
// // //   updateStatus,
// // //   remove,
// // // };

// // const applicationSubmitted = require("../templates/applicationSubmitted");
// // const newApplication = require("../templates/newApplication");
// // const jobRepository = require("../repositories/job.repository");
// // const applicationRepository = require("../repositories/application.repository");
// // const emailService = require("./email.service");

// // const ApiError = require("../utils/ApiError");

// // // const create = async (data) => {
// // //   const job = await jobRepository.findById(data.job_id);

// // //   if (!job) {
// // //     throw new ApiError(404, "Job not found");
// // //   }

// // //   const applicationId = await applicationRepository.create(data);

// // //   await emailService.sendEmail({
// // //     to: data.email,
// // //     subject: "Application Received - Innovise IT Careers",
// // //     html: applicationSubmitted(
// // //       `${data.first_name} ${data.last_name}`,
// // //       job.title,
// // //     ),
// // //   });

// // //   await emailService.sendEmail({
// // //     to: process.env.HR_EMAIL,
// // //     subject: "New Job Application Received",
// // //     html: newApplication(`${data.first_name} ${data.last_name}`, job.title),
// // //   });

// // //   return applicationId;
// // // };
// // // const create = async (application) => {
// // //   const id = await applicationRepository.create(application);

// // //   const job = await jobRepository.findTitleById(application.job_id);

// // //   await emailService.sendEmail({
// // //     to: application.email,

// // //     subject: "Application Received - Innovise IT",

// // //     template: "application-submitted",

// // //     data: {
// // //       first_name: application.first_name,

// // //       job_title: job.title,

// // //       career_url: "https://careers.innovise-it.com",
// // //     },
// // //   });

// // //   return id;
// // // };

// // const create = async (application) => {
// //   console.log("========== New Application ==========");
// //   console.log(application);

// //   // Save application
// //   const id = await applicationRepository.create(application);

// //   console.log("✅ Application saved with ID:", id);

// //   // Get Job Title
// //   const job = await jobRepository.findTitleById(application.job_id);

// //   if (!job) {
// //     throw new Error("Job not found");
// //   }

// //   console.log("✅ Job Found:", job.title);

// //   /*
// //   ----------------------------------------
// //   Candidate Confirmation Email
// //   ----------------------------------------
// //   */

// //   try {
// //     await emailService.sendEmail({
// //       to: application.email,

// //       subject: "Application Received - Innovise IT",

// //       template: "application-submitted",

// //       data: {
// //         first_name: application.first_name,

// //         job_title: job.title,

// //         career_url: "https://careers.innovise-it.com",
// //       },
// //     });

// //     console.log("✅ Candidate email sent");
// //   } catch (err) {
// //     console.error("Candidate Email Error:", err.message);
// //   }

// //   /*
// //   ----------------------------------------
// //   HR Notification Email
// //   ----------------------------------------
// //   */

// //   try {
// //     await emailService.sendEmail({
// //       to: process.env.HR_EMAIL,

// //       subject: `New Application - ${job.title}`,

// //       template: "new-application",

// //       data: {
// //         full_name: `${application.first_name} ${application.last_name}`,

// //         email: application.email,

// //         phone: application.phone,

// //         experience: application.experience,

// //         job_title: job.title,

// //         admin_url: "http://localhost:5173/admin/applications",
// //       },
// //     });

// //     console.log("✅ HR notification sent");
// //   } catch (err) {
// //     console.error("HR Email Error:", err.message);
// //   }

// //   return id;
// // };

// // const getAll = async (query) => {
// //   return await applicationRepository.findAll(query);
// // };

// // const getById = async (id) => {
// //   const application = await applicationRepository.findById(id);

// //   if (!application) {
// //     throw new ApiError(404, "Application not found");
// //   }

// //   return application;
// // };

// // // const updateStatus = async (id, status) => {
// // //   const application = await applicationRepository.findById(id);

// // //   if (!application) {
// // //     throw new ApiError(404, "Application not found");
// // //   }

// // //   await applicationRepository.updateStatus(id, status);

// // //   await emailService.sendEmail({
// // //     to: application.email,
// // //     subject: "Application Status Updated",
// // //     html: statusUpdated(
// // //       `${application.first_name} ${application.last_name}`,
// // //       status,
// // //     ),
// // //   });
// // // };
// // const updateStatus = async (id, status) => {
// //   const application = await applicationRepository.findById(id);

// //   if (!application) {
// //     throw new Error("Application not found");
// //   }

// //   await applicationRepository.updateStatus(id, status);

// //   let message = "";

// //   switch (status) {
// //     case "Reviewed":
// //       message = "Your application has been reviewed by our recruitment team.";
// //       break;

// //     case "Interview":
// //       message =
// //         "Congratulations! You have been shortlisted for the interview round.";
// //       break;

// //     case "Selected":
// //       message =
// //         "Congratulations! You have been selected. Our HR team will contact you shortly.";
// //       break;

// //     case "Rejected":
// //       message =
// //         "Thank you for your interest. We appreciate your time and encourage you to apply for future opportunities.";
// //       break;

// //     default:
// //       message = "Your application status has been updated.";
// //   }

// //   try {
// //     await emailService.sendEmail({
// //       to: application.email,

// //       subject: `Application Status Updated - ${status}`,

// //       template: "application-status",

// //       data: {
// //         first_name: application.first_name,

// //         job_title: application.job_title,

// //         status,

// //         message,

// //         career_url: "https://careers.innovise-it.com",
// //       },
// //     });

// //     console.log("✅ Status email sent");
// //   } catch (err) {
// //     console.error("Status Email Error:", err.message);
// //   }

// //   return true;
// // };

// // const remove = async (id) => {
// //   const application = await applicationRepository.findById(id);

// //   if (!application) {
// //     throw new ApiError(404, "Application not found");
// //   }

// //   await applicationRepository.remove(id);
// // };

// // module.exports = {
// //   create,
// //   getAll,
// //   getById,
// //   updateStatus,
// //   remove,
// // };

// // const jobRepository = require("../repositories/job.repository");
// // const applicationRepository = require("../repositories/application.repository");

// // const emailService = require("./email.service");

// // const ApiError = require("../utils/ApiError");

// const crypto = require("crypto");
// const path = require("path");

// const jobRepository = require("../repositories/job.repository");
// const applicationRepository = require("../repositories/application.repository");

// const emailService = require("./email.service");
// const s3Service = require("./s3.service");

// const ApiError = require("../utils/ApiError");

// /**
//  * Create application
//  */
// // const create = async (application) => {
// //   console.log("========== New Application ==========");

// //   console.log(application);

// //   // Save application
// //   const id = await applicationRepository.create(application);

// //   console.log("✅ Application saved with ID:", id);

// //   // Get job
// //   const job = await jobRepository.findTitleById(application.job_id);

// //   if (!job) {
// //     throw new ApiError(404, "Job not found");
// //   }

// //   console.log("✅ Job Found:", job.title);

// //   /*
// //    * Candidate confirmation email
// //    */
// //   try {
// //     await emailService.sendTemplateEmail({
// //       to: application.email,

// //       templateName: "Application Submitted",

// //       data: {
// //         first_name: application.first_name,

// //         last_name: application.last_name,

// //         job_title: job.title,

// //         career_url: process.env.CAREER_URL || "https://careers.innovise-it.com",
// //       },
// //     });

// //     console.log("✅ Candidate confirmation email sent");
// //   } catch (error) {
// //     console.error("❌ Candidate Email Error:", error.message);
// //   }

// //   /*
// //    * HR notification email
// //    */
// //   try {
// //     await emailService.sendTemplateEmail({
// //       to: process.env.HR_EMAIL,

// //       templateName: "New Application",

// //       data: {
// //         full_name: `${application.first_name} ${application.last_name}`,

// //         email: application.email,

// //         phone: application.phone,

// //         experience: application.experience,

// //         job_title: job.title,

// //         admin_url:
// //           process.env.ADMIN_URL || "http://localhost:5173/admin/applications",
// //       },
// //     });

// //     console.log("✅ HR notification sent");
// //   } catch (error) {
// //     console.error("❌ HR Email Error:", error.message);
// //   }

// //   return id;
// // };
// const create = async (application) => {
//   console.log("========== New Application ==========");

//   const { resumeFile, job_id, ...applicationData } = application;

//   // --------------------------------------------------
//   // 1. Validate resume
//   // --------------------------------------------------

//   if (!resumeFile) {
//     throw new ApiError(400, "Resume is required");
//   }

//   // --------------------------------------------------
//   // 2. Check job exists BEFORE uploading to S3
//   // --------------------------------------------------

//   const job = await jobRepository.findTitleById(job_id);

//   if (!job) {
//     throw new ApiError(404, "Job not found");
//   }

//   console.log("✅ Job Found:", job.title);

//   // --------------------------------------------------
//   // 3. Generate unique S3 key
//   // --------------------------------------------------

//   const extension = path.extname(resumeFile.originalname).toLowerCase();

//   const uniqueId = crypto.randomUUID();

//   const now = new Date();

//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, "0");

//   const s3Key = `applications/${year}/${month}/${uniqueId}${extension}`;

//   console.log("S3 Key:", s3Key);

//   // --------------------------------------------------
//   // 4. Upload resume to S3
//   // --------------------------------------------------

//   try {
//     await s3Service.uploadFile({
//       buffer: resumeFile.buffer,
//       key: s3Key,
//       contentType: resumeFile.mimetype,
//     });

//     console.log("✅ Resume uploaded to S3");
//   } catch (error) {
//     console.error("❌ S3 Resume Upload Error:", error);

//     throw new ApiError(500, "Failed to upload resume. Please try again.");
//   }

//   // --------------------------------------------------
//   // 5. Save application + S3 metadata to MySQL
//   // --------------------------------------------------

//   let applicationId;

//   try {
//     applicationId = await applicationRepository.create({
//       ...applicationData,

//       job_id,

//       resume_key: s3Key,
//       resume_original_name: resumeFile.originalname,
//       resume_mime_type: resumeFile.mimetype,
//       resume_size: resumeFile.size,
//     });

//     console.log("✅ Application saved with ID:", applicationId);
//   } catch (error) {
//     // ------------------------------------------------
//     // Database failed after S3 upload.
//     // Remove orphaned S3 object.
//     // ------------------------------------------------

//     console.error("❌ Application DB Save Error:", error);

//     try {
//       await s3Service.deleteFile(s3Key);

//       console.log("✅ Orphaned S3 resume deleted");
//     } catch (deleteError) {
//       console.error("❌ Failed to cleanup S3 resume:", deleteError);
//     }

//     throw error;
//   }

//   // --------------------------------------------------
//   // 6. Candidate confirmation email
//   // --------------------------------------------------

//   try {
//     await emailService.sendTemplateEmail({
//       to: application.email,

//       templateName: "Application Submitted",

//       data: {
//         first_name: application.first_name,
//         last_name: application.last_name,
//         job_title: job.title,

//         career_url: process.env.CAREER_URL || "https://careers.innovise-it.com",
//       },
//     });

//     console.log("✅ Candidate confirmation email sent");
//   } catch (error) {
//     console.error("❌ Candidate Email Error:", error.message);
//   }

//   // --------------------------------------------------
//   // 7. HR notification email
//   // --------------------------------------------------

//   try {
//     await emailService.sendTemplateEmail({
//       to: process.env.HR_EMAIL,

//       templateName: "New Application",

//       data: {
//         full_name: `${application.first_name} ${application.last_name}`,

//         email: application.email,
//         phone: application.phone,
//         experience: application.experience,
//         job_title: job.title,

//         admin_url:
//           process.env.ADMIN_URL || "http://localhost:5173/admin/applications",
//       },
//     });

//     console.log("✅ HR notification sent");
//   } catch (error) {
//     console.error("❌ HR Email Error:", error.message);
//   }

//   return applicationId;
// };

// /**
//  * Get all applications
//  */
// const getAll = async (query) => {
//   return await applicationRepository.findAll(query);
// };

// /**
//  * Get application by ID
//  */
// const getById = async (id) => {
//   const application = await applicationRepository.findById(id);

//   if (!application) {
//     throw new ApiError(404, "Application not found");
//   }

//   return application;
// };

// const getResumeUrl = async (id) => {
//   const application = await applicationRepository.findById(id);

//   if (!application) {
//     throw new ApiError(404, "Application not found");
//   }

//   if (!application.resume_key) {
//     throw new ApiError(404, "Resume not found");
//   }

//   const url = await s3Service.getSignedUrlForFile({
//     key: application.resume_key,
//     expiresIn: 300,
//   });

//   return {
//     url,
//     expiresIn: 300,
//     fileName: application.resume_original_name,
//     mimeType: application.resume_mime_type,
//   };
// };

// /**
//  * Update application status
//  *
//  * Status:
//  * Pending
//  * Reviewed
//  * Interview
//  * Selected
//  * Rejected
//  */
// const updateStatus = async (id, status) => {
//   const application = await applicationRepository.findById(id);

//   if (!application) {
//     throw new ApiError(404, "Application not found");
//   }

//   /*
//    * Update status in database
//    */
//   await applicationRepository.updateStatus(id, status);

//   /*
//    * Application status → Email template
//    */
//   const templateMap = {
//     Reviewed: "Application Reviewed",

//     Interview: "Interview",

//     Selected: "Selected",

//     Rejected: "Rejected",
//   };

//   const templateName = templateMap[status];

//   /*
//    * Pending or unknown status
//    * does not send email.
//    */
//   if (!templateName) {
//     return true;
//   }

//   /*
//    * Send status email
//    */
//   try {
//     await emailService.sendTemplateEmail({
//       to: application.email,

//       templateName,

//       data: {
//         first_name: application.first_name,

//         last_name: application.last_name,

//         job_title: application.job_title,

//         department_name: application.department_name,

//         status,

//         career_url: process.env.CAREER_URL || "https://careers.innovise-it.com",

//         admin_url:
//           process.env.ADMIN_URL || "http://localhost:5173/admin/applications",
//       },
//     });

//     console.log(`✅ ${status} email sent to ${application.email}`);
//   } catch (error) {
//     /*
//      * Important:
//      *
//      * Application status is already updated.
//      * If email fails, don't rollback the status.
//      */
//     console.error(`❌ ${status} Email Error:`, error.message);
//   }

//   return true;
// };

// /**
//  * Delete application
//  */
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
//   getResumeUrl,
//   updateStatus,
//   remove,
// };

// const crypto = require("crypto");
// const path = require("path");

// const jobRepository = require("../repositories/job.repository");
// const applicationRepository = require("../repositories/application.repository");

// const emailService = require("./email.service");
// const s3Service = require("./s3.service");

// const ApiError = require("../utils/ApiError");

// /**
//  * =========================================================
//  * CREATE APPLICATION
//  * =========================================================
//  */
// const create = async (application) => {
//   console.log("========== New Application ==========");

//   const { resumeFile, job_id, ...applicationData } = application;

//   /**
//    * 1. Validate resume
//    */
//   if (!resumeFile) {
//     throw new ApiError(400, "Resume is required");
//   }

//   /**
//    * 2. Check job
//    */
//   const job = await jobRepository.findTitleById(job_id);

//   if (!job) {
//     throw new ApiError(404, "Job not found");
//   }

//   console.log("Job Found:", job.title);

//   /**
//    * 3. Generate S3 key
//    */
//   const extension = path.extname(resumeFile.originalname).toLowerCase();

//   const uniqueId = crypto.randomUUID();

//   const now = new Date();

//   const year = now.getFullYear();

//   const month = String(now.getMonth() + 1).padStart(2, "0");

//   const s3Key = `applications/${year}/${month}/${uniqueId}${extension}`;

//   console.log("S3 Key:", s3Key);
//   /*
// |--------------------------------------------------------------------------
// | 4. Upload to S3
// |--------------------------------------------------------------------------
// */

//   try {
//     await s3Service.uploadFile({
//       key: s3Key,
//       body: resumeFile.buffer,
//       contentType: resumeFile.mimetype,
//     });

//     console.log("✅ Resume uploaded to S3");
//   } catch (error) {
//     console.error("❌ S3 Resume Upload Error:", error);

//     throw new ApiError(500, "Failed to upload resume. Please try again.");
//   }

//   /**
//    * 5. Save application
//    */
//   let applicationId;

//   try {
//     applicationId = await applicationRepository.create({
//       ...applicationData,

//       job_id,

//       resume_key: s3Key,
//       resume_original_name: resumeFile.originalname,
//       resume_mime_type: resumeFile.mimetype,
//       resume_size: resumeFile.size,
//     });

//     console.log("Application saved:", applicationId);
//   } catch (error) {
//     console.error("Application DB Save Error:", error);

//     /**
//      * Cleanup S3 if DB fails
//      */
//     try {
//       await s3Service.deleteFile(s3Key);

//       console.log("Orphaned S3 resume deleted");
//     } catch (deleteError) {
//       console.error("S3 cleanup failed:", deleteError);
//     }

//     throw error;
//   }

//   /**
//    * 6. Candidate email
//    */
//   try {
//     await emailService.sendTemplateEmail({
//       to: application.email,

//       templateName: "Application Submitted",

//       data: {
//         first_name: application.first_name,

//         last_name: application.last_name,

//         job_title: job.title,

//         career_url: process.env.CAREER_URL || "https://careers.innovise-it.com",
//       },
//     });

//     console.log("Candidate confirmation email sent");
//   } catch (error) {
//     console.error("Candidate Email Error:", error.message);
//   }

//   /**
//    * 7. HR notification
//    */
//   try {
//     if (process.env.HR_EMAIL) {
//       await emailService.sendTemplateEmail({
//         to: process.env.HR_EMAIL,

//         templateName: "New Application",

//         data: {
//           full_name: `${application.first_name} ${application.last_name}`,

//           email: application.email,
//           phone: application.phone,
//           experience: application.experience,

//           job_title: job.title,

//           admin_url:
//             process.env.ADMIN_URL || "http://localhost:5173/admin/applications",
//         },
//       });

//       console.log("HR notification sent");
//     }
//   } catch (error) {
//     console.error("HR Email Error:", error.message);
//   }

//   return applicationId;
// };

// /**
//  * =========================================================
//  * GET ALL
//  * =========================================================
//  */
// const getAll = async (query) => {
//   return applicationRepository.findAll(query);
// };

// /**
//  * =========================================================
//  * GET BY ID
//  * =========================================================
//  */
// const getById = async (id) => {
//   const application = await applicationRepository.findById(id);

//   if (!application) {
//     throw new ApiError(404, "Application not found");
//   }

//   return application;
// };

// /**
//  * =========================================================
//  * GET RESUME SIGNED URL
//  * =========================================================
//  */
// const getResumeUrl = async (applicationId) => {
//   try {
//     const application = await applicationRepository.findById(applicationId);

//     if (!application) {
//       throw new ApiError(404, "Application not found");
//     }

//     if (!application.resume_key) {
//       throw new ApiError(404, "Resume not found for this application");
//     }

//     const url = await s3Service.getSignedUrlForFile(
//       application.resume_key,
//       3600,
//     );

//     return {
//       url,
//       expiresIn: 3600,
//     };
//   } catch (error) {
//     console.error("Generate Resume URL Error:", error);

//     if (error instanceof ApiError) {
//       throw error;
//     }

//     throw new ApiError(500, "Failed to generate resume URL");
//   }
// };

// /**
//  * =========================================================
//  * UPDATE STATUS
//  * =========================================================
//  */
// const updateStatus = async (id, status) => {
//   const allowedStatuses = [
//     "Pending",
//     "Reviewed",
//     "Interview",
//     "Selected",
//     "Rejected",
//   ];

//   if (!allowedStatuses.includes(status)) {
//     throw new ApiError(400, "Invalid application status");
//   }

//   const application = await applicationRepository.findById(id);

//   if (!application) {
//     throw new ApiError(404, "Application not found");
//   }

//   /**
//    * Update DB
//    */
//   await applicationRepository.updateStatus(id, status);

//   /**
//    * Email templates
//    */
//   const templateMap = {
//     Reviewed: "Application Reviewed",
//     Interview: "Interview",
//     Selected: "Selected",
//     Rejected: "Rejected",
//   };

//   const templateName = templateMap[status];

//   if (templateName) {
//     try {
//       await emailService.sendTemplateEmail({
//         to: application.email,

//         templateName,

//         data: {
//           first_name: application.first_name,

//           last_name: application.last_name,

//           job_title: application.job_title,

//           department_name: application.department_name,

//           status,

//           career_url:
//             process.env.CAREER_URL || "https://careers.innovise-it.com",

//           admin_url:
//             process.env.ADMIN_URL || "http://localhost:5173/admin/applications",
//         },
//       });

//       console.log(`${status} email sent to ${application.email}`);
//     } catch (error) {
//       console.error(`${status} Email Error:`, error.message);
//     }
//   }

//   /**
//    * Return updated application
//    */
//   return {
//     ...application,
//     status,
//   };
// };

// /**
//  * =========================================================
//  * DELETE
//  * =========================================================
//  */
// const remove = async (id) => {
//   const application = await applicationRepository.findById(id);

//   if (!application) {
//     throw new ApiError(404, "Application not found");
//   }

//   /**
//    * Delete DB record
//    */
//   await applicationRepository.remove(id);

//   /**
//    * Delete S3 resume
//    */
//   if (application.resume_key) {
//     try {
//       await s3Service.deleteFile(application.resume_key);

//       console.log("Resume deleted from S3");
//     } catch (error) {
//       /**
//        * Do not fail delete if S3 cleanup fails.
//        * DB record is already deleted.
//        */
//       console.error("S3 Resume Delete Error:", error.message);
//     }
//   }
// };

// module.exports = {
//   create,
//   getAll,
//   getById,
//   getResumeUrl,
//   updateStatus,
//   remove,
// };

const crypto = require("crypto");
const path = require("path");

const jobRepository = require("../repositories/job.repository");
const applicationRepository = require("../repositories/application.repository");

const emailService = require("./email.service");
const s3Service = require("./s3.service");

const ApiError = require("../utils/ApiError");

/**
 * =========================================================
 * CREATE APPLICATION
 * =========================================================
 */
const create = async (application) => {
  console.log("========== New Application ==========");

  const { resumeFile, job_id, ...applicationData } = application;

  /**
   * 1. Validate resume
   */
  if (!resumeFile) {
    throw new ApiError(400, "Resume is required");
  }

  /**
   * 2. Check job
   */
  const job = await jobRepository.findTitleById(job_id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  console.log("Job Found:", job.title);

  /**
   * 3. Generate S3 key
   */
  const extension = path.extname(resumeFile.originalname).toLowerCase();
  const uniqueId = crypto.randomUUID();
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const s3Key = `applications/${year}/${month}/${uniqueId}${extension}`;

  console.log("S3 Key:", s3Key);

  /*
  |--------------------------------------------------------------------------
  | 4. Upload to S3
  |--------------------------------------------------------------------------
  */
  try {
    await s3Service.uploadFile({
      key: s3Key,
      body: resumeFile.buffer,
      contentType: resumeFile.mimetype,
    });
    console.log("✅ Resume uploaded to S3");
  } catch (error) {
    console.error("❌ S3 Resume Upload Error:", error);
    throw new ApiError(500, "Failed to upload resume. Please try again.");
  }

  /**
   * 5. Save application
   */
  let applicationId;

  try {
    applicationId = await applicationRepository.create({
      ...applicationData,
      job_id,
      resume_key: s3Key,
      resume_original_name: resumeFile.originalname,
      resume_mime_type: resumeFile.mimetype,
      resume_size: resumeFile.size,
    });
    console.log("Application saved:", applicationId);
  } catch (error) {
    console.error("Application DB Save Error:", error);

    // Cleanup S3 if DB fails
    try {
      await s3Service.deleteFile(s3Key);
      console.log("Orphaned S3 resume deleted");
    } catch (deleteError) {
      console.error("S3 cleanup failed:", deleteError);
    }

    throw error;
  }

  /**
   * 6. Candidate email (NON-BLOCKING)
   */
  emailService
    .sendTemplateEmail({
      to: application.email,
      templateName: "Application Submitted",
      data: {
        first_name: application.first_name,
        last_name: application.last_name,
        job_title: job.title,
        career_url: process.env.CAREER_URL || "https://careers.innovise-it.com",
      },
    })
    .then(() => console.log("Candidate confirmation email sent"))
    .catch((error) => console.error("Candidate Email Error:", error.message));

  /**
   * 7. HR notification (NON-BLOCKING)
   */
  if (process.env.HR_EMAIL) {
    emailService
      .sendTemplateEmail({
        to: process.env.HR_EMAIL,
        templateName: "New Application",
        data: {
          full_name: `${application.first_name} ${application.last_name}`,
          email: application.email,
          phone: application.phone,
          experience: application.experience,
          job_title: job.title,
          admin_url:
            process.env.ADMIN_URL || "http://localhost:5173/admin/applications",
        },
      })
      .then(() => console.log("HR notification sent"))
      .catch((error) => console.error("HR Email Error:", error.message));
  }

  // ✅ Returns instantly now without waiting for emails
  return applicationId;
};

/**
 * =========================================================
 * GET ALL
 * =========================================================
 */
const getAll = async (query) => {
  return applicationRepository.findAll(query);
};

/**
 * =========================================================
 * GET BY ID
 * =========================================================
 */
const getById = async (id) => {
  const application = await applicationRepository.findById(id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  return application;
};

/**
 * =========================================================
 * GET RESUME SIGNED URL
 * =========================================================
 */
const getResumeUrl = async (applicationId) => {
  try {
    const application = await applicationRepository.findById(applicationId);

    if (!application) {
      throw new ApiError(404, "Application not found");
    }

    if (!application.resume_key) {
      throw new ApiError(404, "Resume not found for this application");
    }

    const url = await s3Service.getSignedUrlForFile(
      application.resume_key,
      3600,
    );

    return {
      url,
      expiresIn: 3600,
    };
  } catch (error) {
    console.error("Generate Resume URL Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, "Failed to generate resume URL");
  }
};

/**
 * =========================================================
 * UPDATE STATUS
 * =========================================================
 */
const updateStatus = async (id, status) => {
  const allowedStatuses = [
    "Pending",
    "Reviewed",
    "Interview",
    "Selected",
    "Rejected",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid application status");
  }

  const application = await applicationRepository.findById(id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  /**
   * Update DB
   */
  await applicationRepository.updateStatus(id, status);

  /**
   * Email templates (NON-BLOCKING)
   */
  const templateMap = {
    Reviewed: "Application Reviewed",
    Interview: "Interview",
    Selected: "Selected",
    Rejected: "Rejected",
  };

  const templateName = templateMap[status];

  if (templateName) {
    // ✅ Removed await so the API responds instantly
    emailService
      .sendTemplateEmail({
        to: application.email,
        templateName,
        data: {
          first_name: application.first_name,
          last_name: application.last_name,
          job_title: application.job_title,
          department_name: application.department_name,
          status,
          career_url:
            process.env.CAREER_URL || "https://careers.innovise-it.com",
          admin_url:
            process.env.ADMIN_URL || "http://localhost:5173/admin/applications",
        },
      })
      .then(() => console.log(`${status} email sent to ${application.email}`))
      .catch((error) => console.error(`${status} Email Error:`, error.message));
  }

  /**
   * Return updated application instantly
   */
  return {
    ...application,
    status,
  };
};

/**
 * =========================================================
 * DELETE
 * =========================================================
 */
const remove = async (id) => {
  const application = await applicationRepository.findById(id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  /**
   * Delete DB record
   */
  await applicationRepository.remove(id);

  /**
   * Delete S3 resume (NON-BLOCKING)
   */
  if (application.resume_key) {
    s3Service
      .deleteFile(application.resume_key)
      .then(() => console.log("Resume deleted from S3"))
      .catch((error) =>
        console.error("S3 Resume Delete Error:", error.message),
      );
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getResumeUrl,
  updateStatus,
  remove,
};
