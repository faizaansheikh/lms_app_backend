// const nodemailer = require("nodemailer")

// const sendEmail = async ({ to, subject, html }) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     html,
//   });
// };
// module.exports = {sendEmail}

// src/lib/resend.js
const { Resend } = require("resend")

const resend = new Resend(process.env.RESEND_API_KEY);
module.exports = { resend }
