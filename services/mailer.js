require('dotenv').config()
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SG_KEY);
const sendSGMail = async ({
  from,
  to,
  subject,
  html,
  attachments,
  text,
}) => {
  try {
    const msg = {
      from: from,
      to: to, 
      subject: subject,
      html: html,
      text: text,
      attachments:attachments,
    };
    return sgMail.send(msg)
    .then(() => {
          console.log('Email sent to ' + to + ' from ' + from + 'successfully'); 
        });
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async (args) => {
  if (!process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};
