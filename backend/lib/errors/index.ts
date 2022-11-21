import {
    AccessDeniedError,
    BaseError,
    ConfigurationError,
    DatabaseError,
    InternalError,
    InvalidArgumentError,
    NotFoundError,
    RequestValidationMiddlewareError,
    ValidationError,
} from "@akrdevtech/lib-error-handler-middleware";

class AppErrors {
    public AccessDeniedError: typeof AccessDeniedError;
    public BaseError: typeof BaseError;
    public ConfigurationError: typeof ConfigurationError;
    public DatabaseError: typeof DatabaseError;
    public InternalError: typeof InternalError;
    public InvalidArgumentError: typeof InvalidArgumentError;
    public NotFoundError: typeof NotFoundError;
    public RequestValidationMiddlewareError: typeof RequestValidationMiddlewareError;
    public ValidationError: typeof ValidationError;
    constructor() {
        this.AccessDeniedError = AccessDeniedError;
        this.BaseError = BaseError;
        this.ConfigurationError = ConfigurationError;
        this.DatabaseError = DatabaseError;
        this.InternalError = InternalError;
        this.InvalidArgumentError = InvalidArgumentError;
        this.NotFoundError = NotFoundError;
        this.RequestValidationMiddlewareError = RequestValidationMiddlewareError;
        this.ValidationError = ValidationError;
    }
}

export default new AppErrors();