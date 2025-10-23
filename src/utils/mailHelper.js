import config from "../config/index.js"

import transporter from "../config/transporter.config.js"

const mailHelper = async (option) => {
    try{
        const message = {
        from: config.SMTP_SENDER_EMAIL,
        to: option.email,
        subject: option.subject,
        text: option.message,
        //html: option.html || `<p>${option.message}</p>`
    }
    
    const info = await transporter.sendMail(message);
    console.log("Email sent! Message ID:", info.messageId);
    return info;

    }catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}


export default mailHelper