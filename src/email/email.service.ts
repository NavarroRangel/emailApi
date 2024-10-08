/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });
  }

  async sendEmail(to: string, subject: string, templateName: string, templateData: any) {
    const templatePath = path.join(__dirname, '../../src/email/templates', `${templateName}.ejs`);


    
    const source = fs.readFileSync(templatePath, 'utf8');
    const html = ejs.render(source, templateData);

    const info = await this.transporter.sendMail({
      from: '"NestJS Email" <your-email@example.com>',
      to,
      subject,
      html,
    });

    return `Email sent: ${info.messageId}`;
  }
}
