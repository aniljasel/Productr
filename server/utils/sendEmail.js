const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Debug Configuration
    console.log(`[Email] Attempting to send to: ${options.email}`);
    console.log(`[Email] Host: ${process.env.SMTP_HOST}`);
    console.log(`[Email] Port: ${process.env.SMTP_PORT}`);
    console.log(`[Email] User: ${process.env.EMAIL_USER}`);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false // Helps with some strict firewalls
        },
        connectionTimeout: 5000, // 5 seconds timeout
        debug: true,
        logger: true
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
