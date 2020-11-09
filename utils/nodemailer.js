import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.TRANSPORT_USER,
    pass: process.env.TRANSPORT_PASS,
  },
});

function sendMail(mailOptions) {
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
}

module.exports = sendMail;

// USAGE:
// const mailOptions = {
//     from: "Sender Name <sender@domain.tld>",
//     to: "Recipient",
//     subject: ``,
//     text: ``,
//      html: ``,
// };

// const response = await sendMail(mailOptions);
