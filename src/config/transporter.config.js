import nodemailer from "nodemailer"

import config from "./index.js"

const transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_HOST,
    port: config.SMTP_MAIL_PORT,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: config.SMTP_MAIL_USERNAME, // generated ethereal user
      pass: config.SMTP_MAIL_PASSWORD, // generated ethereal password
    },
})


const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_SENDER_EMAIL,
      to: "test@example.com", 
      subject: "Test Email from Node.js via Mailtrap",
      text: "Hello! This is a test email from Mailtrap sandbox.",
      html: "<h3>Hello!</h3><p>This is a test email from Mailtrap sandbox.</p>"
    });

    console.log("Email sent! Message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendTestEmail();

export default transporter;