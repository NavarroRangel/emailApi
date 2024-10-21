/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'barrett.hartmann15@ethereal.email',
      pass: 'PZb7xWDRAFaR5g9p14'
    }
  });

  async sendEmail(to: string, subject: string, templateName: string, templateData: any): Promise<string> {
    try {
      const templatePath = path.join(__dirname, '../../src/email/templates', `${templateName}.ejs`);
      console.log(templatePath);

      const source = fs.readFileSync(templatePath, 'utf8');

      const html = ejs.render(source, templateData);

      const info = await this.transporter.sendMail({
        from: 'magnotravel@magnotravel.com.br',
        to,
        subject,
        html,
      });

      return `Email sent: ${info.messageId}`;
    } catch (error) {
      console.error('Error sending email:', error);

      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
