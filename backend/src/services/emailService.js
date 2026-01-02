import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Send welcome email to new collector
 * @param {string} to - Recipient email
 * @param {string} name - Collector name
 * @param {string} password - Generated password
 * @param {string} loginUrl - Login URL
 * @param {number} salary - Base salary
 * @param {number} commission - Commission rate
 */
export const sendCollectorWelcomeEmail = async (to, name, password, loginUrl, salary, commission) => {
    try {
        const mailOptions = {
            from: `"ProCollector Admin" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Welcome to ProCollector - Your Account Credentials',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #2E8B57;">Welcome to ProCollector</h2>
                        <p style="color: #666;">You have been registered as a Collector.</p>
                    </div>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                        <h3 style="margin-top: 0;">Login Credentials</h3>
                        <p><strong>Email:</strong> ${to}</p>
                        <p><strong>Temporary Password:</strong> ${password}</p>
                        <p>Please change your password after your first login.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <a href="${loginUrl}" style="background-color: #2E8B57; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Portal</a>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <h3>Compensation Package</h3>
                        <ul>
                            <li><strong>Base Salary:</strong> FCFA ${salary.toLocaleString()}</li>
                            <li><strong>Commission Rate:</strong> ${commission}% per successful collection</li>
                        </ul>
                    </div>

                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

                    <p style="font-size: 12px; color: #999; text-align: center;">
                        This is an automated message. Please do not reply directly to this email.<br>
                        &copy; ${new Date().getFullYear()} Altonixa Group. All rights reserved.
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

/**
 * Send welcome email to new client
 * @param {string} to - Client email
 * @param {string} name - Client name
 * @param {string} password - Generated password
 * @param {string} loginUrl - Login URL
 * @param {string} phone - Client phone
 * @param {string} roomNumber - Room/Shop Number
 */
export const sendClientWelcomeEmail = async (to, name, password, loginUrl, phone, roomNumber) => {
    try {
        const mailOptions = {
            from: `"ProCollector Team" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Welcome to ProCollector - Account Credentials',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #2E8B57;">Welcome, ${name}!</h2>
                        <p style="color: #666;">Your client account has been successfully created.</p>
                    </div>
                    
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                        <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Login Credentials</h3>
                        <p><strong>URL:</strong> <a href="${loginUrl}" style="color: #2E8B57;">${loginUrl}</a></p>
                        <p><strong>Email:</strong> ${to}</p>
                        <p><strong>Temporary Password:</strong> <strong style="color: #d4af37;">${password}</strong></p>
                    </div>

                    <div style="background-color: #f0fdf4; padding: 15px; border-radius: 5px; border-left: 4px solid #2E8B57;">
                        <h4 style="margin: 0 0 10px 0; color: #166534;">Your Account Details</h4>
                        <p style="margin: 5px 0;"><strong>Room/Shop:</strong> ${roomNumber}</p>
                        <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
                    </div>

                    <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
                        Please change your password upon first login for security.<br>
                        &copy; ${new Date().getFullYear()} ProCollector. All rights reserved.
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Client welcome email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending client email:', error);
        // Don't throw to prevent blocking the flow, but log error
        return null;
    }
};

/**
 * Send collection receipt email
 * @param {string} to - Client email
 * @param {string} name - Client name
 * @param {string} amount - Amount collected (formatted)
 * @param {string} date - Date of collection
 * @param {string} newBalance - New balance (formatted)
 * @param {string} paymentMethod - Payment method
 */
export const sendCollectionReceiptEmail = async (to, name, amount, date, newBalance, paymentMethod) => {
    try {
        const mailOptions = {
            from: `"ProCollector Team" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Payment Receipt - ProCollector',
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; border: 1px solid #e0e0e0;">
                    <div style="background-color: #2E8B57; padding: 20px; text-align: center;">
                        <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Payment Received</h2>
                    </div>
                    
                    <div style="padding: 30px 20px;">
                        <p style="color: #555; font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
                        <p style="color: #555; font-size: 16px; line-height: 1.5;">
                            We have successfully received your payment. Here are the details of the transaction:
                        </p>
                        
                        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px 0; color: #777; font-size: 14px;">Amount Paid</td>
                                    <td style="padding: 10px 0; color: #333; font-size: 18px; font-weight: bold; text-align: right;">${amount}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #777; font-size: 14px; border-top: 1px solid #eee;">Date</td>
                                    <td style="padding: 10px 0; color: #333; font-size: 14px; text-align: right; border-top: 1px solid #eee;">${date}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #777; font-size: 14px; border-top: 1px solid #eee;">Payment Method</td>
                                    <td style="padding: 10px 0; color: #333; font-size: 14px; text-align: right; border-top: 1px solid #eee; text-transform: capitalize;">${paymentMethod}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px 0 5px; color: #2E8B57; font-size: 14px; font-weight: bold; border-top: 2px solid #2E8B57;">New Balance</td>
                                    <td style="padding: 15px 0 5px; color: #2E8B57; font-size: 20px; font-weight: bold; text-align: right; border-top: 2px solid #2E8B57;">${newBalance}</td>
                                </tr>
                            </table>
                        </div>

                        <p style="color: #888; font-size: 14px; text-align: center; margin-top: 30px;">
                            Thank you for saving with us!
                        </p>
                    </div>
                    
                    <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                        &copy; ${new Date().getFullYear()} ProCollector.
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Collection receipt sent to: %s', to);
        return info;
    } catch (error) {
        console.error('Error sending receipt email:', error);
        return null;
    }
};

export default {
    sendCollectorWelcomeEmail,
    sendClientWelcomeEmail,
    sendCollectionReceiptEmail
};
