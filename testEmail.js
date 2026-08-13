// require("dotenv").config();
// const nodemailer = require("nodemailer");

// async function test() {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   try {
//     const info = await transporter.sendMail({
//       from: process.env.SMTP_FROM,
//       to: process.env.EMAIL_USER,
//       subject: "Test Email",
//       html: "<h1>Email is working!</h1>",
//     });

//     console.log(info);
//   } catch (err) {
//     console.error(err);
//   }
// }

// test();

require("dotenv").config();

const transporter = require("./src/config/mail");

async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.HR_EMAIL,
      subject: "Innovise IT - Amazon SES Test Email",
      text: "This is a test email sent through Amazon SES using Nodemailer.",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Innovise IT</h2>

          <p>Hello,</p>

          <p>
            This is a test email from the Innovise IT Careers application.
          </p>

          <p>
            <strong>Amazon SES SMTP integration is working successfully.</strong>
          </p>

          <p>
            Regards,<br>
            Innovise IT
          </p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully");
    console.log("📧 Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Test email failed");
    console.error(error.message);
  }
}

sendTestEmail();
