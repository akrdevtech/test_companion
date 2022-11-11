import { IAppFeatures } from "../interfaces/appFeatures";

export abstract class BaseService {
    public appFeatures: IAppFeatures;
    protected appLogger: IAppFeatures["AppLoger"];

    constructor(appFeatures?: IAppFeatures) {
        this.appFeatures = appFeatures;
        this.appLogger = this.appFeatures.AppLoger;
    }
}
