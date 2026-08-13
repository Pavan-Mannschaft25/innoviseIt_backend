const interviewRepository = require("../repositories/interview.repository");
const applicationRepository = require("../repositories/application.repository");
const emailService = require("./email.service");

const ApiError = require("../utils/ApiError");

const scheduleInterview = async (data) => {
  /*
   * Get application
   */
  const application = await applicationRepository.findById(data.application_id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  /*
   * Create interview
   */
  const interviewId = await interviewRepository.create(data);

  /*
   * Update application status
   */
  await applicationRepository.updateStatus(data.application_id, "Interview");

  /*
   * Send Interview Email
   */
  try {
    await emailService.sendTemplateEmail({
      to: application.email,

      templateName: "Interview",

      data: {
        /*
         * Candidate/Application data
         */
        first_name: application.first_name,

        last_name: application.last_name,

        email: application.email,

        job_title: application.job_title,

        department_name: application.department_name,

        /*
         * Interview data
         */
        interview_date: data.interview_date,

        interview_time: data.interview_time,

        interview_timezone: data.interview_timezone,

        interview_duration: `${data.duration_minutes} minutes`,

        interview_type: data.interview_type,

        interviewer_name: data.interviewer_name,

        meeting_link: data.meeting_link,

        /*
         * Application URLs
         */
        career_url: process.env.CAREER_URL || "https://careers.innovise-it.com",

        recruiter_email: process.env.HR_EMAIL,
      },
    });

    console.log("✅ Interview invitation sent");
  } catch (error) {
    console.error("❌ Interview email failed:", error.message);
  }

  return {
    interview_id: interviewId,
    application_id: data.application_id,
    status: "Interview",
  };
};

const getById = async (id) => {
  const interview = await interviewRepository.findById(id);

  if (!interview) {
    throw new ApiError(404, "Interview not found");
  }

  return interview;
};

const getByApplicationId = async (applicationId) => {
  return await interviewRepository.findByApplicationId(applicationId);
};

const update = async (id, data) => {
  const interview = await getById(id);

  await interviewRepository.update(id, data);

  return true;
};

const updateStatus = async (id, status) => {
  await getById(id);

  await interviewRepository.updateStatus(id, status);

  return true;
};

const remove = async (id) => {
  await getById(id);

  await interviewRepository.remove(id);
};

module.exports = {
  scheduleInterview,
  getById,
  getByApplicationId,
  update,
  updateStatus,
  remove,
};
