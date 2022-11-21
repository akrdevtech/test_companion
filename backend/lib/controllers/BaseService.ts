import { IAppFeatures } from "../interfaces/appFeatures";

export interface IServicesOptions {
    moduleName: string;
}
export abstract class BaseService {
    public appFeatures: IAppFeatures;
    protected appLogger: IAppFeatures["AppLoger"];
    protected moduleName: string;

    constructor(appFeatures?: IAppFeatures, options?: IServicesOptions) {
        this.appFeatures = appFeatures;
        this.appLogger = this.appFeatures.AppLoger;
        this.moduleName = options.moduleName;
    }

    protected logInfo(message: string) {
        this.appLogger.logMessage(this.appLogger.ELogTypes.INFO, this.moduleName, message)
    }
    protected logWarn(message: string) {
        this.appLogger.logMessage(this.appLogger.ELogTypes.WARN, this.moduleName, message)
    }
    protected logDebug(message: string) {
        this.appLogger.logMessage(this.appLogger.ELogTypes.DEBUG, this.moduleName, message)
    }
    protected logError(message: string, ...err: Record<string, unknown>[]) {
        this.appLogger.logMessage(this.appLogger.ELogTypes.ERROR, this.moduleName, message, ...err)
    }
}
