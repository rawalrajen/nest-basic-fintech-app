import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo(): { app_name: string; version: string; status: boolean } {
    return {
      status: true,
      app_name: process.env.APP_NAME || 'newsletter-service',
      version: process.env.APP_VERSION || '1.0.0',
    };
  }
}
