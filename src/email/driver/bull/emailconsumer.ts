import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from 'src/email/email.service';

@Processor('email')
export class EmailConsumer extends WorkerHost {
  constructor(private readonly emailService: EmailService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    console.log(job);

    try {
      const { to, subject, templateName, templateData } = job.data;

      await this.emailService.sendEmail(
        to,
        subject,
        templateName,
        templateData,
      );

      await job.moveToCompleted('done', job.token, true);
    } catch (error) {
      console.error('Error processing job:', error);

      await job.moveToFailed(new Error('Failed to process job'), job.token);
    }
  }
}
