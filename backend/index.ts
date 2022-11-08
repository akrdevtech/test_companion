import express, { Express, Request, Response } from 'express';
import { ConfigManager } from './lib/config';
import { App } from './app';
import { HealthCheckController } from './lib/controllers/common/health_check_controller';
import { DbBase } from './lib/vendors/database/DbBase';
import { IAppFeatures } from './lib/interfaces/AppFeatures';

const appConfig = ConfigManager.getAppConfig();

const port = process.env.SERVER_PORT || appConfig.envConfig.port || '8081';

const controllers = [
  HealthCheckController,
]

new DbBase(appConfig.dbConfig).registerModels().then(DbCollections => {
  const appFeatures: IAppFeatures = {
    DbCollections
  }
  const expressApp = new App(
    controllers.map((Controller) => new Controller(appConfig, appFeatures)),
    port,
    appConfig,
  );
  expressApp.initializeLocalApp()
})
