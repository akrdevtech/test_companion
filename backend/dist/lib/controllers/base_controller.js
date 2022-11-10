"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const request_validation_error_1 = require("../errors/request_validation_error");
const util_1 = require("../log/util");
class BaseController {
    constructor(envConfig) {
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.asyncHandler = (fn) => (req, res, next) => {
            (0, util_1.logInfo)(`[transactionId] ${req.txId}`);
            this.validateRequest(req);
            return Promise.resolve(fn(req, res, next)).catch(next);
        };
        this.API_BASE_URL = envConfig.apiBaseUrl;
    }
    validateRequest(request) {
        const errors = null;
        if (errors) {
            throw new request_validation_error_1.RequestValidationError(errors.array());
        }
    }
    /**
     *
     * @param response Express response object
     * @param status Http status code
     * @param data response data to be returned
     */
    sendResponse(response, status, data) {
        if (status >= 400)
            response.status(status).send(data);
        else
            response.status(status).send({ data });
    }
    getPagination(page, limit) {
        return { page: page || 1, limit: limit || 10 };
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base_controller.js.map