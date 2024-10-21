import { Module } from '@nestjs/common';
import { EmailConsumer } from './driver/bull/emailconsumer';
import { EmailService } from './email.service';
import { EmailController } from './driver/http/email.controller';
import { BullModule } from '@nestjs/bullmq';

@Module({
  providers: [EmailService, EmailConsumer],
  controllers: [EmailController],
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
})
export class EmailModule {}
