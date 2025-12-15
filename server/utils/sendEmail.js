const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Debug Configuration
    console.log(`[Email] Attempting to send to: ${options.email}`);
    console.log(`[Email] Host: ${process.env.SMTP_HOST}`);
    console.log(`[Email] Port: ${process.env.SMTP_PORT}`);
    console.log(`[Email] User: ${process.env.EMAIL_USER}`);

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Automatically handles host, port (465/587) and secure
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        // tls: { rejectUnauthorized: false } // Only use if absolutely necessary, better to trust defaults first
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
