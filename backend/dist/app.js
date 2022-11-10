"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const util_1 = require("./lib/log/util");
const errorHandler_1 = require("./lib/middleware/intercepter/errorHandler");
const httpStatusCode_1 = require("./lib/enums/httpStatusCode");
const transaction_middleware_1 = require("./lib/middleware/tracing/transaction_middleware");
const lib_mongodb_with_migrate_1 = require("@akrdevtech/lib-mongodb-with-migrate");
const getCorsOptions = (corsAllowedOrigins) => ({
    origin: (origin, callback) => {
        if (corsAllowedOrigins.indexOf('*') !== -1 || corsAllowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
});
class App {
    constructor(controllers, port, appConfig) {
        (0, util_1.logInfo)('Initializing express application');
        this.app = (0, express_1.default)();
        this.port = port;
        this.envConfig = appConfig.envConfig;
        this.mongoConfig = appConfig.mongoConfig;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    initializeMiddlewares() {
        // Enable cors
        this.app.options('*', (0, cors_1.default)());
        this.app.use((0, cors_1.default)(getCorsOptions(this.envConfig.accessAllowedFrom)));
        this.app.use(transaction_middleware_1.addTransactionId);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            (0, util_1.logInfo)(`Initializing '${controller.constructor.name}' controller at path '${controller.getBasePath()}'`);
            this.app.use('/', controller.router);
        });
        // error middleware
        this.app.use(errorHandler_1.errorHandler);
        (0, util_1.logInfo)('All middlewares added successfully to the express application');
    }
    async performMigrations() {
        const db = new lib_mongodb_with_migrate_1.BaseMongoClient({
            uri: this.mongoConfig.uri,
            dbName: this.mongoConfig.dbName,
            ssl: this.mongoConfig.ssl,
            logLevel: this.mongoConfig.logLevel,
        });
        (0, util_1.logInfo)('Starting database migrations...');
        const migrated = await db.performMigrations();
        if (Array.isArray(migrated) && migrated.length)
            migrated.forEach((filename) => (0, util_1.logInfo)(`Migrated the migration file ${filename}`));
        (0, util_1.logInfo)('Completed database migrations...');
    }
    initializeApp() {
        this.app.get('/', (req, res) => res.status(httpStatusCode_1.HttpStatusCode.OK).send('Test Companion Service'));
        return this.performMigrations().then(() => {
            return new Promise((resolve) => {
                const server = this.app.listen(this.port, () => {
                    (0, util_1.logInfo)(`⚡️ Service started : ENVIRONMENT → ${config_1.default.get('Environment.name')}, PORT → ${this.port}`);
                    server.setTimeout(30000);
                    resolve(server);
                });
            });
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map