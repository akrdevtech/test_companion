import { ISQLiteConfig, BaseSQLiteClient } from "../../supportLibs/sqlite";
import { UserModel } from "./User";
import { Model, Sequelize } from "sequelize";

export interface IDbCollections {
    Users: Model,
}

export interface IDbBase {
    registerModels(): Promise<IDbCollections>;
}

export class DbBase implements IDbBase {
    private sequelize: Sequelize;
    private dbConfig: ISQLiteConfig;

    constructor(config: ISQLiteConfig) {
        this.dbConfig = config;
    }

    public async registerModels(): Promise<IDbCollections> {
        const dbClient = new BaseSQLiteClient(this.dbConfig);
        this.sequelize = await dbClient.getDbConnection();
        const collections = {
            Users: UserModel(this.sequelize),
        }
        this.sequelize = await dbClient.syncDb({ force: true, alter: false });
        return collections;
    }
}
