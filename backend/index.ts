import express, { Express, Request, Response } from 'express';
import { ConfigManager } from './lib/config';
import { App } from './app';
import { HealthCheckController } from './lib/controllers/common/HealthCheckController';
import { IAppFeatures } from './lib/interfaces/appFeatures';
import { appLogger } from './lib/log/util';
import { StudentsController } from './lib/controllers/students/StudentsController';
import { CoursesController } from './lib/controllers/course/CourseController';

const appConfig = ConfigManager.getAppConfig();

const port = process.env.SERVER_PORT || appConfig.envConfig.port || '8081';

const controllers = [
  HealthCheckController,
  StudentsController,
  CoursesController,
]

const appFeatures: IAppFeatures = {
  AppLoger: appLogger
}
const expressApp = new App(
  controllers.map((Controller) => new Controller(appConfig, appFeatures)),
  port,
  appConfig,
);
expressApp.initializeApp()
