import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('email')
export class EmailController {
  constructor(@InjectQueue('email') private audioQueue: Queue) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('templateName') templateName: string,
    @Body('templateData') templateData: any,
  ) {
    return this.audioQueue.add('email', {
      to,
      subject,
      templateName,
      templateData,
    });
  }
}
