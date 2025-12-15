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

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[Email] SMTP Sent Successfully`);
    } catch (smtpError) {
        console.error(`[Email] SMTP Failed: ${smtpError.message}`);

        // HTTP API FALLBACK (Brevo/Sendinblue)
        // Only if we have an API Key (User needs to add BREVO_API_KEY)
        // OR we try to use the EMAIL_PASS if it looks like an API key (xkeysib-...)

        let apiKey = process.env.BREVO_API_KEY;
        if (!apiKey && process.env.EMAIL_PASS && process.env.EMAIL_PASS.startsWith('xkeysib-')) {
            apiKey = process.env.EMAIL_PASS;
        }

        if (apiKey) {
            console.log(`[Email] Attempting HTTP API Fallback (Brevo)...`);
            try {
                const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'api-key': apiKey,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        sender: { email: process.env.EMAIL_USER, name: 'Productr' },
                        to: [{ email: options.email }],
                        subject: options.subject,
                        htmlContent: options.html || options.message,
                        textContent: options.message
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`API Error: ${JSON.stringify(errorData)}`);
                }
                console.log(`[Email] HTTP API Sent Successfully`);
            } catch (apiError) {
                console.error(`[Email] HTTP API Failed: ${apiError.message}`);
                throw apiError; // Throw final error to trigger the controller's failover logging
            }
        } else {
            console.log(`[Email] No BREVO_API_KEY found for fallback.`);
            throw smtpError; // No API key, re-throw SMTP error
        }
    }
};

module.exports = sendEmail;
