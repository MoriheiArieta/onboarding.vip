// config/email.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Use your email service
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMagicLink = async (email, token) => {
  const magicLink = `http://localhost:5173/auth/${token}`; // Your frontend URL

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Magic Link",
    text: `Click this link to log in: ${magicLink}`,
    html: `<p>Click <a href="${magicLink}">here</a> to log in.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
