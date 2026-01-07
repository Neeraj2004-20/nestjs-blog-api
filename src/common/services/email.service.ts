import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.APP_URL}/api/auth/verify-email?token=${token}`;

    return this.transporter.sendMail({
      to: email,
      subject: 'Verify your email - Blog API',
      html: `
        <h2>Email Verification</h2>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>Link expires in 24 hours.</p>
      `,
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.APP_URL}/api/auth/reset-password?token=${token}`;

    return this.transporter.sendMail({
      to: email,
      subject: 'Password Reset - Blog API',
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>Link expires in 1 hour.</p>
      `,
    });
  }

  async sendWelcomeEmail(email: string, username: string) {
    return this.transporter.sendMail({
      to: email,
      subject: 'Welcome to Blog API',
      html: `
        <h2>Welcome, ${username}!</h2>
        <p>Thank you for joining our blog platform.</p>
        <p>Start creating posts and connecting with other writers today!</p>
      `,
    });
  }
}
