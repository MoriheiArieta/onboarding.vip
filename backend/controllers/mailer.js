import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendMagicLink = async (email, token) => {
  const subject = "Your Magic Link";
  const verifyUrl = `http://localhost:3000/verify?token=${token}`;
  const body = `
    <p>Hi! Click this link to log in:</p>
    <a href="${verifyUrl}">Verify your login</a>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  const mailOptions = {
    to: email,
    from: process.env.NODEMAILER_EMAIL,
    subject: subject,
    html: body,
  };

  try {
    await transport.sendMail(mailOptions);
    console.log("Magic link sent.");
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default sendMagicLink;
