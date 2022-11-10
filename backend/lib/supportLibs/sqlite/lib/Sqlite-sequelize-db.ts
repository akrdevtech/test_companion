import { Sequelize, Dialect } from 'sequelize';
import { SyncOptions } from "sequelize/types/sequelize";

export enum SqliteDialects {
    SQLite = 'sqlite'
}

export interface ISQLiteConfigOptions {
    HOST: string;
    DIALECT?: Dialect;
}

export interface ISQLiteConfig {
    USER: string;
    PASSWORD: string;
    DB: string;
    OPTIONS: ISQLiteConfigOptions;
}

export class BaseSQLiteClient {
    private _dbDb: string;
    private _dbUser: string;
    private _dbPassword: string;
    private _options: ISQLiteConfigOptions;
    private sequelize: Sequelize;

    constructor(sqliteConfig: ISQLiteConfig) {
        this._dbDb = sqliteConfig.DB;
        this._dbUser = sqliteConfig.USER;
        this._dbPassword = sqliteConfig.PASSWORD;
        this._options = {
            HOST: sqliteConfig.OPTIONS.HOST,
            DIALECT: sqliteConfig.OPTIONS.DIALECT || SqliteDialects.SQLite,
        };
    }

    public async getDbConnection(): Promise<Sequelize> {
        this.sequelize = new Sequelize(this._dbDb, this._dbUser, this._dbPassword, {
            dialect: this._options.DIALECT,
            host: this._options.HOST,
        });

        this.sequelize.authenticate()
            .then(() => console.info(`a0ff8fce-31ea-11ed-a261-0242ac120002 Connected to ${this._dbDb}`))
            .catch((err) => console.error(`a77ce900-31ea-11ed-a261-0242ac120002 DB authentication error : ${err}`));

        return this.sequelize;
    }

    public async syncDb(options?: SyncOptions): Promise<Sequelize> {
        this.sequelize.sync(options)
            .then(() => console.info(`43a61d98-31ea-11ed-a261-0242ac120002 DB Synced`))
            .catch((err) => console.error(`967a7866-31ea-11ed-a261-0242ac120002 DB sync error : ${err}`));
        return this.sequelize;
    }
}