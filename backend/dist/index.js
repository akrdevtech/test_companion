"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./lib/config");
const app_1 = require("./app");
const HealthCheckController_1 = require("./lib/controllers/common/HealthCheckController");
const util_1 = require("./lib/log/util");
const StudentsController_1 = require("./lib/controllers/students/StudentsController");
const appConfig = config_1.ConfigManager.getAppConfig();
const port = process.env.SERVER_PORT || appConfig.envConfig.port || '8081';
const controllers = [
    HealthCheckController_1.HealthCheckController,
    StudentsController_1.StudentsController
];
const appFeatures = {
    AppLoger: util_1.appLogger
};
const expressApp = new app_1.App(controllers.map((Controller) => new Controller(appConfig, appFeatures)), port, appConfig);
expressApp.initializeApp();
//# sourceMappingURL=index.js.map