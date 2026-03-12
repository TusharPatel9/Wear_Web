const mailer = require("nodemailer");

const mailsend = async (to, subject, text) => {
  const transpoter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOption = {
    from: process.env.MAIL_EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  const mailResponse = await transpoter.sendMail(mailOption);
  return mailResponse;
};

module.exports = mailsend;
