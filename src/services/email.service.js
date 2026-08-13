// // // // const transporter = require("../config/mail");

// // // // const renderTemplate = require("../utils/template.util");

// // // // const repository = require("../repositories/email.repository");

// // // // const getAll = async () => {
// // // //   return await repository.findAll();
// // // // };

// // // // const getById = async (id) => {
// // // //   const email = await repository.findById(id);

// // // //   if (!email) {
// // // //     throw new Error("Email not found");
// // // //   }

// // // //   return email;
// // // // };

// // // // const create = async (data) => {
// // // //   return await repository.create(data);
// // // // };

// // // // const update = async (id, data) => {
// // // //   await getById(id);

// // // //   await repository.update(id, data);
// // // // };

// // // // const remove = async (id) => {
// // // //   await getById(id);

// // // //   await repository.remove(id);
// // // // };

// // // // const sendEmail = async ({ to, subject, template, data }) => {
// // // //   const html = renderTemplate(template, data);

// // // //   await transporter.sendMail({
// // // //     from: process.env.SMTP_FROM,
// // // //     to,
// // // //     subject,
// // // //     html,
// // // //   });
// // // // };

// // // // module.exports = {
// // // //   getAll,
// // // //   getById,
// // // //   create,
// // // //   update,
// // // //   remove,
// // // //   sendEmail,
// // // // };

// // // const transporter = require("../config/mail");
// // // const renderTemplate = require("../utils/template.util");
// // // const repository = require("../repositories/email.repository");

// // // // const getAll = async () => {
// // // //   return await repository.findAll();
// // // // };

// // // const getAll = async (query) => {
// // //   const emails = await repository.findAll(query);

// // //   const total = await repository.count(query);

// // //   return {
// // //     emails,

// // //     pagination: {
// // //       total,

// // //       page: Number(query.page || 1),

// // //       limit: Number(query.limit || 10),

// // //       totalPages: Math.ceil(total / Number(query.limit || 10)),
// // //     },
// // //   };
// // // };

// // // const getById = async (id) => {
// // //   const email = await repository.findById(id);

// // //   if (!email) {
// // //     throw new Error("Email not found");
// // //   }

// // //   return email;
// // // };

// // // const create = async (data) => {
// // //   return await repository.create(data);
// // // };

// // // const update = async (id, data) => {
// // //   await getById(id);
// // //   await repository.update(id, data);
// // // };

// // // const remove = async (id) => {
// // //   await getById(id);
// // //   await repository.remove(id);
// // // };

// // // const sendEmail = async ({
// // //   recipient,
// // //   subject,
// // //   template,
// // //   body,
// // //   data,
// // //   sent_by,
// // // }) => {
// // //   try {
// // //     // If template is provided, render it. Otherwise use raw HTML body.
// // //     const html = template ? renderTemplate(template, data) : body;

// // //     await transporter.sendMail({
// // //       from: process.env.SMTP_FROM,
// // //       to: recipient,
// // //       subject,
// // //       html,
// // //     });

// // //     // Save success log
// // //     const id = await repository.create({
// // //       recipient,
// // //       subject,
// // //       body: html,
// // //       status: "Sent",
// // //       error_message: null,
// // //       sent_by,
// // //     });

// // //     return {
// // //       id,
// // //       status: "Sent",
// // //     };
// // //   } catch (error) {
// // //     // Save failed log
// // //     await repository.create({
// // //       recipient,
// // //       subject,
// // //       body: body || "",
// // //       status: "Failed",
// // //       error_message: error.message,
// // //       sent_by,
// // //     });

// // //     throw new Error(error.message);
// // //   }
// // // };

// // // const resendEmail = async (id) => {
// // //   const email = await repository.findById(id);

// // //   if (!email) {
// // //     throw new Error("Email not found");
// // //   }

// // //   try {
// // //     await transporter.sendMail({
// // //       from: process.env.SMTP_FROM,

// // //       to: email.recipient,

// // //       subject: email.subject,

// // //       html: email.body,
// // //     });

// // //     await repository.updateStatus(id, "Sent", null);

// // //     return {
// // //       success: true,
// // //       message: "Email resent successfully",
// // //     };
// // //   } catch (error) {
// // //     await repository.updateStatus(id, "Failed", error.message);

// // //     throw new Error(error.message);
// // //   }
// // // };

// // // module.exports = {
// // //   getAll,
// // //   getById,
// // //   create,
// // //   update,
// // //   remove,
// // //   sendEmail,
// // //   resendEmail,
// // // };

// // const transporter = require("../config/mail");
// // const renderTemplate = require("../utils/template.util");
// // const repository = require("../repositories/email.repository");

// // const getAll = async (query) => {
// //   const emails = await repository.findAll(query);
// //   const total = await repository.count(query);

// //   return {
// //     emails,
// //     pagination: {
// //       total,
// //       page: Number(query.page || 1),
// //       limit: Number(query.limit || 10),
// //       totalPages: Math.ceil(total / Number(query.limit || 10)),
// //     },
// //   };
// // };

// // const getById = async (id) => {
// //   const email = await repository.findById(id);

// //   if (!email) {
// //     throw new Error("Email not found");
// //   }

// //   return email;
// // };

// // const create = async (data) => {
// //   return await repository.create(data);
// // };

// // const update = async (id, data) => {
// //   await getById(id);
// //   await repository.update(id, data);
// // };

// // const remove = async (id) => {
// //   await getById(id);
// //   await repository.remove(id);
// // };

// // const sendEmail = async ({
// //   to,
// //   recipient,
// //   subject,
// //   template,
// //   body,
// //   data,
// //   sent_by,
// // }) => {
// //   // Support both keys
// //   const email = recipient || to;

// //   if (!email) {
// //     throw new Error("Recipient email is required");
// //   }

// //   try {
// //     const html = template ? renderTemplate(template, data) : body;

// //     await transporter.sendMail({
// //       from: process.env.SMTP_FROM,
// //       to: email,
// //       subject,
// //       html,
// //     });

// //     const id = await repository.create({
// //       recipient: email,
// //       subject,
// //       body: html,
// //       status: "Sent",
// //       error_message: null,
// //       sent_by,
// //     });

// //     return {
// //       id,
// //       status: "Sent",
// //     };
// //   } catch (error) {
// //     await repository.create({
// //       recipient: email,
// //       subject,
// //       body: body || "",
// //       status: "Failed",
// //       error_message: error.message,
// //       sent_by,
// //     });

// //     throw error;
// //   }
// // };

// // const resendEmail = async (id) => {
// //   const email = await repository.findById(id);

// //   if (!email) {
// //     throw new Error("Email not found");
// //   }

// //   try {
// //     await transporter.sendMail({
// //       from: process.env.SMTP_FROM,
// //       to: email.recipient,
// //       subject: email.subject,
// //       html: email.body,
// //     });

// //     await repository.updateStatus(id, "Sent", null);

// //     return {
// //       success: true,
// //       message: "Email resent successfully",
// //     };
// //   } catch (error) {
// //     await repository.updateStatus(id, "Failed", error.message);
// //     throw error;
// //   }
// // };

// // module.exports = {
// //   getAll,
// //   getById,
// //   create,
// //   update,
// //   remove,
// //   sendEmail,
// //   resendEmail,
// // };

// // const transporter = require("../config/mail");
// // const renderTemplate = require("../utils/template.util");

// // const repository = require("../repositories/email.repository");
// // const emailTemplateService = require("./emailTemplate.service");

// // /**
// //  * Replace variables like:
// //  *
// //  * {{first_name}}
// //  * {{job_title}}
// //  * {{status}}
// //  *
// //  * with actual values.
// //  */
// // const replaceVariables = (text, data = {}) => {
// //   if (!text) {
// //     return "";
// //   }

// //   return text.replace(/{{\s*([\w]+)\s*}}/g, (_, key) => data[key] ?? "");
// // };

// // /**
// //  * Send email using a database email template
// //  */
// // const sendTemplateEmail = async ({
// //   to,
// //   recipient,
// //   templateName,
// //   data = {},
// //   sent_by,
// // }) => {
// //   const email = recipient || to;

// //   if (!email) {
// //     throw new Error("Recipient email is required");
// //   }

// //   if (!templateName) {
// //     throw new Error("Email template name is required");
// //   }

// //   try {
// //     // Get template from database
// //     const template = await emailTemplateService.getByName(templateName);

// //     if (!template) {
// //       throw new Error(`Email template not found: ${templateName}`);
// //     }

// //     // Replace variables in subject
// //     const subject = replaceVariables(template.subject, data);

// //     // Replace variables in body
// //     const html = replaceVariables(template.body, data);

// //     // Send email
// //     return await sendEmail({
// //       to: email,
// //       subject,
// //       body: html,
// //       sent_by,
// //     });
// //   } catch (error) {
// //     console.error(`Template Email Error [${templateName}]:`, error.message);

// //     throw error;
// //   }
// // };

// // /**
// //  * Generic email sender
// //  *
// //  * Supports:
// //  * 1. body directly
// //  * 2. old filesystem template
// //  */
// // const sendEmail = async ({
// //   to,
// //   recipient,
// //   subject,
// //   template,
// //   body,
// //   data,
// //   sent_by,
// // }) => {
// //   const email = recipient || to;

// //   if (!email) {
// //     throw new Error("Recipient email is required");
// //   }

// //   try {
// //     let html = body || "";

// //     // Support old template system
// //     if (template) {
// //       html = renderTemplate(template, data);
// //     }

// //     await transporter.sendMail({
// //       from: process.env.SMTP_FROM,
// //       to: email,
// //       subject,
// //       html,
// //     });

// //     // Save successful email
// //     const id = await repository.create({
// //       recipient: email,
// //       subject,
// //       body: html,
// //       status: "Sent",
// //       error_message: null,
// //       sent_by,
// //     });

// //     return {
// //       id,
// //       status: "Sent",
// //     };
// //   } catch (error) {
// //     console.error("Email sending error:", error);

// //     // Save failed email
// //     await repository.create({
// //       recipient: email,
// //       subject,
// //       body: body || "",
// //       status: "Failed",
// //       error_message: error.message,
// //       sent_by,
// //     });

// //     throw error;
// //   }
// // };

// // /**
// //  * Get emails
// //  */
// // const getAll = async (query) => {
// //   const emails = await repository.findAll(query);

// //   const total = await repository.count(query);

// //   return {
// //     emails,
// //     pagination: {
// //       total,
// //       page: Number(query.page || 1),
// //       limit: Number(query.limit || 10),
// //       totalPages: Math.ceil(total / Number(query.limit || 10)),
// //     },
// //   };
// // };

// // /**
// //  * Get email by ID
// //  */
// // const getById = async (id) => {
// //   const email = await repository.findById(id);

// //   if (!email) {
// //     throw new Error("Email not found");
// //   }

// //   return email;
// // };

// // /**
// //  * Create email log manually
// //  */
// // const create = async (data) => {
// //   return await repository.create(data);
// // };

// // /**
// //  * Update email log
// //  */
// // const update = async (id, data) => {
// //   await getById(id);

// //   await repository.update(id, data);
// // };

// // /**
// //  * Delete email log
// //  */
// // const remove = async (id) => {
// //   await getById(id);

// //   await repository.remove(id);
// // };

// // /**
// //  * Resend existing email
// //  */
// // const resendEmail = async (id) => {
// //   const email = await repository.findById(id);

// //   if (!email) {
// //     throw new Error("Email not found");
// //   }

// //   try {
// //     await transporter.sendMail({
// //       from: process.env.SMTP_FROM,
// //       to: email.recipient,
// //       subject: email.subject,
// //       html: email.body,
// //     });

// //     await repository.updateStatus(id, "Sent", null);

// //     return {
// //       success: true,
// //       message: "Email resent successfully",
// //     };
// //   } catch (error) {
// //     await repository.updateStatus(id, "Failed", error.message);

// //     throw error;
// //   }
// // };

// // module.exports = {
// //   getAll,
// //   getById,
// //   create,
// //   update,
// //   remove,
// //   sendEmail,
// //   sendTemplateEmail,
// //   resendEmail,
// // };

// const { sendSES } = require("../config/ses");
// const renderTemplate = require("../utils/template.util");

// const repository = require("../repositories/email.repository");
// const emailTemplateService = require("./emailTemplate.service");

// /**
//  * Replace variables like:
//  *
//  * {{first_name}}
//  * {{job_title}}
//  * {{status}}
//  *
//  * with actual values.
//  */
// const replaceVariables = (text, data = {}) => {
//   if (!text) {
//     return "";
//   }

//   return text.replace(/{{\s*([\w]+)\s*}}/g, (_, key) => data[key] ?? "");
// };

// /**
//  * Send email using a database email template
//  */
// const sendTemplateEmail = async ({
//   to,
//   recipient,
//   templateName,
//   data = {},
//   sent_by,
// }) => {
//   const email = recipient || to;

//   if (!email) {
//     throw new Error("Recipient email is required");
//   }

//   if (!templateName) {
//     throw new Error("Email template name is required");
//   }

//   try {
//     // Get template from database
//     const template = await emailTemplateService.getByName(templateName);

//     if (!template) {
//       throw new Error(`Email template not found: ${templateName}`);
//     }

//     // Replace variables in subject
//     const subject = replaceVariables(template.subject, data);

//     // Replace variables in body
//     const html = replaceVariables(template.body, data);

//     // Send email
//     return await sendEmail({
//       to: email,
//       subject,
//       body: html,
//       sent_by,
//     });
//   } catch (error) {
//     console.error(`Template Email Error [${templateName}]:`, error.message);

//     throw error;
//   }
// };

// /**
//  * Generic email sender
//  *
//  * Supports:
//  * 1. body directly
//  * 2. old filesystem template
//  */
// const sendEmail = async ({
//   to,
//   recipient,
//   subject,
//   template,
//   body,
//   data,
//   sent_by,
// }) => {
//   const email = recipient || to;

//   if (!email) {
//     throw new Error("Recipient email is required");
//   }

//   try {
//     let html = body || "";

//     // Support old filesystem template
//     if (template) {
//       html = renderTemplate(template, data);
//     }

//     // Send through AWS SES API
//     const result = await sendSES({
//       to: email,
//       subject,
//       html,
//     });

//     console.log("✅ Email sent successfully:", {
//       recipient: email,
//       messageId: result.MessageId,
//     });

//     // Save successful email
//     const id = await repository.create({
//       recipient: email,
//       subject,
//       body: html,
//       status: "Sent",
//       error_message: null,
//       sent_by,
//     });

//     return {
//       id,
//       status: "Sent",
//       messageId: result.MessageId,
//     };
//   } catch (error) {
//     console.error("❌ Email sending error:", error);

//     // Save failed email
//     await repository.create({
//       recipient: email,
//       subject,
//       body: body || "",
//       status: "Failed",
//       error_message: error.message,
//       sent_by,
//     });

//     throw error;
//   }
// };

// /**
//  * Get emails
//  */
// const getAll = async (query) => {
//   const emails = await repository.findAll(query);

//   const total = await repository.count(query);

//   return {
//     emails,
//     pagination: {
//       total,
//       page: Number(query.page || 1),
//       limit: Number(query.limit || 10),
//       totalPages: Math.ceil(total / Number(query.limit || 10)),
//     },
//   };
// };

// /**
//  * Get email by ID
//  */
// const getById = async (id) => {
//   const email = await repository.findById(id);

//   if (!email) {
//     throw new Error("Email not found");
//   }

//   return email;
// };

// /**
//  * Create email log manually
//  */
// const create = async (data) => {
//   return await repository.create(data);
// };

// /**
//  * Update email log
//  */
// const update = async (id, data) => {
//   await getById(id);

//   await repository.update(id, data);
// };

// /**
//  * Delete email log
//  */
// const remove = async (id) => {
//   await getById(id);

//   await repository.remove(id);
// };

// /**
//  * Resend existing email
//  */
// const resendEmail = async (id) => {
//   const email = await repository.findById(id);

//   if (!email) {
//     throw new Error("Email not found");
//   }

//   try {
//     const result = await sendSES({
//       to: email.recipient,
//       subject: email.subject,
//       html: email.body,
//     });

//     await repository.updateStatus(id, "Sent", null);

//     console.log("✅ Email resent:", result.MessageId);

//     return {
//       success: true,
//       message: "Email resent successfully",
//       messageId: result.MessageId,
//     };
//   } catch (error) {
//     console.error("❌ Resend email error:", error);

//     await repository.updateStatus(id, "Failed", error.message);

//     throw error;
//   }
// };

// module.exports = {
//   getAll,
//   getById,
//   create,
//   update,
//   remove,
//   sendEmail,
//   sendTemplateEmail,
//   resendEmail,
// };

const { sendSES } = require("../config/ses");

const renderTemplate = require("../utils/template.util");

const repository = require("../repositories/email.repository");

const emailTemplateService = require("./emailTemplate.service");

// ============================================================
// Replace template variables
// ============================================================

const replaceVariables = (text, data = {}) => {
  if (!text) {
    return "";
  }

  return text.replace(/{{\s*([\w]+)\s*}}/g, (_, key) => data[key] ?? "");
};

// ============================================================
// Send template email
// ============================================================

const sendTemplateEmail = async ({
  to,
  recipient,
  templateName,
  data = {},
  sent_by,
}) => {
  const email = recipient || to;

  if (!email) {
    throw new Error("Recipient email is required");
  }

  if (!templateName) {
    throw new Error("Email template name is required");
  }

  try {
    const template = await emailTemplateService.getByName(templateName);

    if (!template) {
      throw new Error(`Email template not found: ${templateName}`);
    }

    const subject = replaceVariables(template.subject, data);

    const html = replaceVariables(template.body, data);

    return await sendEmail({
      to: email,
      subject,
      body: html,
      sent_by,
    });
  } catch (error) {
    console.error(`Template Email Error [${templateName}]:`, error.message);

    throw error;
  }
};

// ============================================================
// Generic email sender
// ============================================================

const sendEmail = async ({
  to,
  recipient,
  subject,
  template,
  body,
  data,
  sent_by,
}) => {
  const email = recipient || to;

  if (!email) {
    throw new Error("Recipient email is required");
  }

  try {
    let html = body || "";

    // Old filesystem template support
    if (template) {
      html = renderTemplate(template, data);
    }

    // ========================================================
    // AWS SES API
    // ========================================================

    const result = await sendSES({
      to: email,
      subject,
      html,
    });

    console.log("✅ EMAIL SENT:", {
      recipient: email,
      messageId: result.MessageId,
    });

    // ========================================================
    // Save successful email
    // ========================================================

    const id = await repository.create({
      recipient: email,
      subject,
      body: html,
      status: "Sent",
      error_message: null,
      sent_by,
    });

    return {
      id,
      status: "Sent",
      messageId: result.MessageId,
    };
  } catch (error) {
    console.error("❌ Email sending error:", error);

    // ========================================================
    // Save failed email
    // ========================================================

    await repository.create({
      recipient: email,
      subject,
      body: body || "",
      status: "Failed",
      error_message: error.message,
      sent_by,
    });

    throw error;
  }
};

// ============================================================
// Get emails
// ============================================================

const getAll = async (query) => {
  const emails = await repository.findAll(query);

  const total = await repository.count(query);

  return {
    emails,
    pagination: {
      total,
      page: Number(query.page || 1),
      limit: Number(query.limit || 10),
      totalPages: Math.ceil(total / Number(query.limit || 10)),
    },
  };
};

// ============================================================
// Get email by ID
// ============================================================

const getById = async (id) => {
  const email = await repository.findById(id);

  if (!email) {
    throw new Error("Email not found");
  }

  return email;
};

// ============================================================
// Create email log manually
// ============================================================

const create = async (data) => {
  return await repository.create(data);
};

// ============================================================
// Update email log
// ============================================================

const update = async (id, data) => {
  await getById(id);

  await repository.update(id, data);
};

// ============================================================
// Delete email log
// ============================================================

const remove = async (id) => {
  await getById(id);

  await repository.remove(id);
};

// ============================================================
// Resend email
// ============================================================

const resendEmail = async (id) => {
  const email = await repository.findById(id);

  if (!email) {
    throw new Error("Email not found");
  }

  try {
    const result = await sendSES({
      to: email.recipient,
      subject: email.subject,
      html: email.body,
    });

    await repository.updateStatus(id, "Sent", null);

    console.log("✅ EMAIL RESENT:", result.MessageId);

    return {
      success: true,
      message: "Email resent successfully",
      messageId: result.MessageId,
    };
  } catch (error) {
    console.error("❌ Resend email error:", error);

    await repository.updateStatus(id, "Failed", error.message);

    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  sendEmail,
  sendTemplateEmail,
  resendEmail,
};
