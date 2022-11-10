"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSQLiteClient = exports.SqliteDialects = void 0;
const sequelize_1 = require("sequelize");
var SqliteDialects;
(function (SqliteDialects) {
    SqliteDialects["SQLite"] = "sqlite";
})(SqliteDialects = exports.SqliteDialects || (exports.SqliteDialects = {}));
class BaseSQLiteClient {
    constructor(sqliteConfig) {
        this._dbDb = sqliteConfig.DB;
        this._dbUser = sqliteConfig.USER;
        this._dbPassword = sqliteConfig.PASSWORD;
        this._options = {
            HOST: sqliteConfig.OPTIONS.HOST,
            DIALECT: sqliteConfig.OPTIONS.DIALECT || SqliteDialects.SQLite,
        };
    }
    async getDbConnection() {
        this.sequelize = new sequelize_1.Sequelize(this._dbDb, this._dbUser, this._dbPassword, {
            dialect: this._options.DIALECT,
            host: this._options.HOST,
        });
        this.sequelize.authenticate()
            .then(() => console.info(`a0ff8fce-31ea-11ed-a261-0242ac120002 Connected to ${this._dbDb}`))
            .catch((err) => console.error(`a77ce900-31ea-11ed-a261-0242ac120002 DB authentication error : ${err}`));
        return this.sequelize;
    }
    async syncDb(options) {
        this.sequelize.sync(options)
            .then(() => console.info(`43a61d98-31ea-11ed-a261-0242ac120002 DB Synced`))
            .catch((err) => console.error(`967a7866-31ea-11ed-a261-0242ac120002 DB sync error : ${err}`));
        return this.sequelize;
    }
}
exports.BaseSQLiteClient = BaseSQLiteClient;
//# sourceMappingURL=Sqlite-sequelize-db.js.map