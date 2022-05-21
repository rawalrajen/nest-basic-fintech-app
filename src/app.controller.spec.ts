import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getAppInfo', () => {
    it('should return app info', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.aboutApp()).toStrictEqual({
        status: true,
        app_name: 'newsletter-service',
        version: '1.0.0',
      });
    });
  });
});
