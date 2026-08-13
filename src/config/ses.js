const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
});

const sendSES = async ({ to, subject, html }) => {
  if (!to) {
    throw new Error("Recipient email is required");
  }

  if (!subject) {
    throw new Error("Email subject is required");
  }

  const command = new SendEmailCommand({
    Source: process.env.SMTP_FROM,

    Destination: {
      ToAddresses: [to],
    },

    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },

      Body: {
        Html: {
          Data: html,
          Charset: "UTF-8",
        },
      },
    },
  });

  const result = await sesClient.send(command);

  console.log("✅ SES EMAIL SENT:", result.MessageId);

  return result;
};

module.exports = {
  sendSES,
};
