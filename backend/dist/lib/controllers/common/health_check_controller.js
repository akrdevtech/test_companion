"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckController = void 0;
const express_1 = __importDefault(require("express"));
const httpStatusCode_1 = require("../../enums/httpStatusCode");
const base_controller_1 = require("../base_controller");
class HealthCheckController extends base_controller_1.BaseController {
    constructor(appConfig, appFeatures) {
        super(appConfig.envConfig);
        this.getHealth = (request, response) => {
            // this.dbCollection.Users.find()
            response.status(httpStatusCode_1.HttpStatusCode.OK).send({ status: 'ok', txId: request.txId, appConfig: this.appConf });
        };
        this.basePath = `${this.API_BASE_URL}/healthcheck`;
        this.router = express_1.default.Router();
        this.appConf = appConfig;
        this.dbCollection = appFeatures.DbCollections;
        this.intializeRoutes();
    }
    getBasePath() {
        return this.basePath;
    }
    intializeRoutes() {
        this.router.get(this.basePath, this.getHealth);
    }
}
exports.HealthCheckController = HealthCheckController;
//# sourceMappingURL=health_check_controller.js.map