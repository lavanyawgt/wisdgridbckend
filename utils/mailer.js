const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,  // "apikey"
    pass: process.env.EMAIL_PASS   // Your SendGrid API key
  }
});

const sendContactEmail = async (formData, subject = 'New Contact') => {
  const { name, email, phoneNo, company, message } = formData;

  const mailOptions = {
    from: `"Dyspek Website" <supershieldworksd@gmail.com>`,  // or use a verified domain
    to: process.env.NOTIFY_EMAIL,
    subject,
    text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phoneNo}
        Company: ${company}
        Message: ${message}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📨 Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    throw err;
  }
};

module.exports = sendContactEmail;
