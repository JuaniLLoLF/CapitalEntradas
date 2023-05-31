const nodemailer = require("nodemailer");

const sendEmail = async (userMail, subject, body) => {
  const message = {
    to: userMail,
    from: process.env.GMAILUSER,
    subject: subject,
    text: subject,
    html: body,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASS,
    },
  });

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
