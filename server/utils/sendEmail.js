const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Debug Configuration
    console.log(`[Email] Attempting to send to: ${options.email}`);
    console.log(`[Email] Host: ${process.env.SMTP_HOST}`);
    console.log(`[Email] Port: ${process.env.SMTP_PORT}`);
    console.log(`[Email] User: ${process.env.EMAIL_USER}`);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        },
        family: 4, // Force IPv4 (Critical for Render)
        debug: true, // Show SMTP handshake
        logger: true // Log to console
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
