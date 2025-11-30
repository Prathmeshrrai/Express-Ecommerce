// import express from "express";
// import { sendEmail } from "../utils/mailHelper.js";

// const router = express.Router();

// router.get("/test-email", async (req, res) => {
//   try {
//     const to = req.query.to;

//     if (!to) {
//       return res.status(400).json({
//         success: false,
//         message: "Please pass ?to=yourEmail"
//       });
//     }

//     await sendEmail(
//       to,
//       "Test Email from Render Backend",
//       "<h1>Your backend is working! 🎉</h1>"
//     );

//     return res.json({
//       success: true,
//       message: "Email sent successfully via Resend!"
//     });
//   } catch (error) {
//     console.error("Email sending failed:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to send email",
//       error: error.message
//     });
//   }
// });

// export default router;

import express from "express";
import { sendEmail } from "../utils/mailHelper.js";

const router = express.Router();

// /email/test-email?to=someone@gmail.com
router.get("/test-email", async (req, res) => {
  try {
    const { to } = req.query;

    if (!to) {
      return res.status(400).json({
        success: false,
        message: "Please pass ?to=yourEmail",
      });
    }

    await sendEmail(
      to,
      "Test Email from Render Backend",
      "<h1>Your backend is working! 🎉</h1>"
    );

    return res.json({
      success: true,
      message: "Email sent successfully via Resend!",
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
});

export default router;
