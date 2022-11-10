"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbBase = void 0;
const sqlite_1 = require("../../supportLibs/sqlite");
const User_1 = require("./User");
class DbBase {
    constructor(config) {
        this.dbConfig = config;
    }
    async registerModels() {
        const dbClient = new sqlite_1.BaseSQLiteClient(this.dbConfig);
        this.sequelize = await dbClient.getDbConnection();
        const collections = {
            Users: (0, User_1.UserModel)(this.sequelize),
        };
        this.sequelize = await dbClient.syncDb({ force: true, alter: false });
        return collections;
    }
}
exports.DbBase = DbBase;
//# sourceMappingURL=DbBase.js.map