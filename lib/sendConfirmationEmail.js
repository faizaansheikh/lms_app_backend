// import { resend } from "../helpers.js/helpers";

const { resend } = require('../helpers.js/helpers')
const sendConfirmationEmail = async ({ email, name }) => {
    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: [email],
        subject: "Welcome! Your Account Is Ready",
        html: `
      <h2>Welcome ${name} 👋</h2>
      <p>Your account has been successfully created.</p>
      <p>You now have full access to your dashboard and courses.</p>
      <br/>
      <p>Regards,<br/>Course Team</p>
    `,
    });

    if (error) {
        console.error("Email error:", error);
        throw new Error("Failed to send confirmation email");
    }

    return data;
};

module.exports = { sendConfirmationEmail }