"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./lib/config");
const app_1 = require("./app");
const health_check_controller_1 = require("./lib/controllers/common/health_check_controller");
const DbBase_1 = require("./lib/vendors/database/DbBase");
const appConfig = config_1.ConfigManager.getAppConfig();
const port = process.env.SERVER_PORT || appConfig.envConfig.port || '8081';
const controllers = [
    health_check_controller_1.HealthCheckController,
];
new DbBase_1.DbBase(appConfig.dbConfig).registerModels().then(DbCollections => {
    const appFeatures = {
        DbCollections
    };
    const expressApp = new app_1.App(controllers.map((Controller) => new Controller(appConfig, appFeatures)), port, appConfig);
    expressApp.initializeLocalApp();
});
//# sourceMappingURL=index.js.map