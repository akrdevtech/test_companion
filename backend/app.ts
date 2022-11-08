import express from 'express';
import cors from 'cors';
import config from 'config';
import { logInfo } from './lib/log/util';
import { BaseController } from './lib/controllers/base_controller';
import { IAppConfig, IEnvConfig } from './lib/config';
import { errorHandler } from './lib/middleware/intercepter/errorHandler';
import { HttpStatusCode } from './lib/enums/httpStatusCode';
import { IncomingMessage, Server } from 'http';
import { addTransactionId } from './lib/middleware/tracing/transaction_middleware';


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

    constructor(controllers: Array<BaseController>, port: string, appConfig: IAppConfig) {
        logInfo('Initializing express application');
        this.app = express();
        this.port = port;
        this.envConfig = appConfig.envConfig;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    private initializeMiddlewares() {
        // Enable cors
        this.app.options('*', cors());
        this.app.use(cors(getCorsOptions(this.envConfig.accessAllowedFrom)));
        this.app.use(addTransactionId);
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

    public initializeLocalApp(): Promise<Server> {
        this.app.get('/', (req, res) => res.status(HttpStatusCode.OK).send('Test Companion Service'));
        return new Promise((resolve) => {
            const server = this.app.listen(this.port, () => {
                logInfo(`⚡️ Service started : ENVIRONMENT → ${config.get('Environment.name')}, PORT → ${this.port}`);
                server.setTimeout(30000);
                resolve(server);
            });
        });
    }
}