import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log("Email sent:", response);
    return response;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};


// import { resend } from "../config/resend.config.js";
// import dotenv from "dotenv";
// dotenv.config();

// const mailHelper = async ({ email, subject, message, html }) => {
//   try {
//     const response = await resend.emails.send({
//       from: process.env.EMAIL_FROM,
//       to: email,
//       subject,
//       text: message,
//       html: html || `<p>${message}</p>`
//     });

//     console.log("Email sent:", response);
//     return response;
//   } catch (error) {
//     console.error("Resend Email Error:", error);
//     throw error;
//   }
// };

// export default mailHelper;


// import config from "../config/index.js"

// import transporter from "../config/transporter.config.js"

// const mailHelper = async (option) => {
//     try{
//         const message = {
//         from: config.SMTP_SENDER_EMAIL,
//         to: option.email,
//         subject: option.subject,
//         text: option.message,
//         //html: option.html || `<p>${option.message}</p>`
//     }
    
//     const info = await transporter.sendMail(message);
//     console.log("Email sent! Message ID:", info.messageId);
//     return info;

//     }catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// }


// export default mailHelper