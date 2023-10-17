import SlackHook from 'winston-slack-webhook-transport';
import { LogLevel } from '@nestjs-logger/shared/logger/domain/log';

export default class SlackTransport {
  public static create(webhookUrl: string) {
    return new SlackHook({
      level: LogLevel.Fatal,
      webhookUrl: webhookUrl,
      formatter: (info) => {
        const title =
          '[' +
          info.timestamp +
          '] Fatal error registered [' +
          info.data.label +
          ']';
        return {
          text: title,
          blocks: [
            {
              type: 'section',
              fields: [
                {
                  type: 'mrkdwn',
                  text: '*' + title + '*',
                },
              ],
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '*[' + info.data.sourceClass + ']* ' + info.message,
              },
            },
          ],
          attachments: [
            {
              type: 'mrkdwn',
              text:
                info.data && info.data.error
                  ? '*Stack:* ' + info.data.error.stack
                  : undefined,
            },
            {
              type: 'mrkdwn',
              text: '*Payload:* ' + JSON.stringify(info, null, 4),
            },
          ],
        };
      },
    });
  }
}
