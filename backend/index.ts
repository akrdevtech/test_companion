import express, { Express, Request, Response } from 'express';
import { ConfigManager } from './lib/config';
import { App } from './app';
import { HealthCheckController } from './lib/controllers/common/health_check_controller';

const appConfig = ConfigManager.getAppConfig();

const port = process.env.SERVER_PORT || appConfig.envConfig.port || '8081';

const controllers = [
  HealthCheckController,
]

const expressApp = new App(
  controllers.map((Controller) => new Controller(appConfig)),
  port,
  appConfig,
);

expressApp.initializeLocalApp()