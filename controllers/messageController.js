const Message = require("../Models/Message");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASS,
    },
});



const getAllMessages = async (req, res) => {
    const allMessages = await Message.find();
    if (!allMessages.length) {
        return res.status(300).json({ message: "No Messages found" });
    }
    res.status(200).json(allMessages);
}

const createMessage = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Invalid Data" });
    }

    const emailContent = `
    <html>
    <head>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F0F0F0;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #E80505;
            font-size: 28px;
            margin-bottom: 20px;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FF9C1A;
            color: #FFFFFF;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #E80505;
        }
        </style>
    </head>
    <body>
        <h1>Thank You for Contacting!</h1>
        <p>Dear ${name},</p>
        <p>I have received your message sent via our website's contact form. Your inquiry is important to me, and I will respond to it as soon as possible.</p>
        <h2>Your Contact Details:</h2>
        <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
        </ul>
        <h2>Your Message:</h2>
        <p>${message}</p>
        <p>If you have any further questions or need immediate assistance, please don't hesitate to reach out to me.</p>
        <p>Best regards,</p>
        <p>Anish Kumar</p>
        <a class="button" href="https://profile-anish.onrender.com">Visit Our Website</a>
    </body>
    </html>
`;

try{
        const info = await transporter.sendMail({
        from: '"Anish Kumar 📧📩" anishkumar62072@gmail.com',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: emailContent,
    });
    console.log(info);
}catch(e){
    console.log(e);
}

    const createMessage = await Message.create({ name, email, message });

    if (createMessage) {
        return res.json({ message: "Message Created" });
    }
}

module.exports = { createMessage, getAllMessages };
