import express from 'express';
import cors from 'cors';
import config from 'config';
import { logInfo } from './lib/log/util';
import { BaseController } from './lib/controllers/BaseController';
import { IAppConfig, IEnvConfig, IMongoConfig } from './lib/config';
import { errorHandler } from '@akrdevtech/lib-error-handler-middleware';
import { HttpStatusCode } from './lib/enums/httpStatusCode';
import { IncomingMessage, Server } from 'http';
import { expressRequestId } from "@akrdevtech/lib-express-request-id";
import { BaseMongoClient } from '@akrdevtech/lib-mongodb-with-migrate';


const getCorsOptions = (corsAllowedOrigins: string[]) => ({
    origin: (origin: string | undefined, callback: (err: Error | null, origin?: boolean | string) => void) => {
        if (corsAllowedOrigins.indexOf('*') !== -1 || corsAllowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
});

export class App {
    public app: express.Application;
    public port: string;
    public envConfig: IEnvConfig;
    private mongoConfig: IMongoConfig;

    constructor(controllers: Array<BaseController>, port: string, appConfig: IAppConfig) {
        logInfo('Initializing express application');
        this.app = express();
        this.port = port;
        this.envConfig = appConfig.envConfig;
        this.mongoConfig = appConfig.mongoConfig;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    private initializeMiddlewares() {
        // Enable cors
        this.app.options('*', cors());
        this.app.use(cors(getCorsOptions(this.envConfig.accessAllowedFrom)));

        // adding transaction id
        this.app.use(expressRequestId());
        
        // Support for parsing application/json
        this.app.use(
            express.json({
                limit: '5MB',
                type: 'application/json',
            }),
        );

        // Support for parsing application/x-www-form-urlencoded
        this.app.use(
            express.urlencoded({
                extended: true,
                parameterLimit: 5,
                limit: '5MB',
            }),
        );
    }

    private initializeControllers(controllers: Array<BaseController>) {
        controllers.forEach((controller) => {
            logInfo(`Initializing '${controller.constructor.name}' controller at path '${controller.getBasePath()}'`);
            this.app.use('/', controller.router);
        });
        // error middleware
        this.app.use(errorHandler);
        logInfo('All middlewares added successfully to the express application');
    }

    public async performMigrations(): Promise<void> {
        const db = new BaseMongoClient({
            uri: this.mongoConfig.uri,
            dbName: this.mongoConfig.dbName,
            ssl: this.mongoConfig.ssl,
            logLevel: this.mongoConfig.logLevel,
        });

        logInfo('Starting database migrations...');
        const migrated = await db.performMigrations();
        if (Array.isArray(migrated) && migrated.length)
            migrated.forEach((filename: string) => logInfo(`Migrated the migration file ${filename}`));
        logInfo('Completed database migrations...');
    }

    public initializeApp(): Promise<Server> {
        this.app.get('/', (req, res) => res.status(HttpStatusCode.OK).send('Test Companion Service'));
        return this.performMigrations().then(() => {
            return new Promise((resolve) => {
                const server = this.app.listen(this.port, () => {
                    logInfo(`⚡️ Service started : ENVIRONMENT → ${config.get('Environment.name')}, PORT → ${this.port}`);
                    server.setTimeout(30000);
                    resolve(server);
                });
            });
        });
    }
}