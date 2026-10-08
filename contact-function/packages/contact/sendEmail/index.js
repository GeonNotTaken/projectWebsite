import nodemailer from "nodemailer";

async function main(args) {
    const{name, email, message} = args;

    if(!name || !email|| !message) {
        statusCode: 400;
        body: { error: "Missing Required Fields." }
    };
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            user: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: "cortes.evan@outlook.com",
            subject: `New message. from ${name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        });

        return {
            statusCode: 200,
            body: { success: true, message: "Email Sent!"}
        };

    } catch(err) {
            return {
              statusCode: 500,  
              body: { error: "Failed to send email.", details: err.message}
            };
        }
}

export { main };