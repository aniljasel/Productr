const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    family: 4, // Force IPv4
    logger: true,
    debug: true,
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000
});

const mailOptions = {
    from: `Productr <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
};

await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
