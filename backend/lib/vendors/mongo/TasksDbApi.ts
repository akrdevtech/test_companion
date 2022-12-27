import { DbCollection } from '../../enums/dbCollection';
import { Collection, ObjectId } from 'mongodb';
import { IMongoConfig } from "../../config";
import { IAppFeatures } from "../../interfaces/appFeatures";
import { BaseMongoClient } from "./BaseMongoClient";
import { ITaskModel } from '../../interfaces/task';
import { DatabaseError, InternalError } from '@akrdevtech/lib-error-handler-middleware';
import { InternalErrorMessages } from '../../enums/errors';
import { HttpStatusCode } from '../../enums/httpStatusCode';


export interface ITasksDbApi {

}
export class TasksDbApi extends BaseMongoClient implements ITasksDbApi {
    constructor(mongoConfig: IMongoConfig, appFeatures?: IAppFeatures) {
        super(mongoConfig, appFeatures, { moduleName: 'Tasks DB' });
    }
    protected async getTasksCollection(): Promise<Collection> {
        const db = await this.getDb();
        return db.collection(DbCollection.TASKS);
    }

    async getTasksById(id: ObjectId | string): Promise<ITaskModel> {
        this.logInfo(`Fetching Tasks Data for id ${id.toString()}`);
        const tasksCollection = await this.getTasksCollection();
        const record = await tasksCollection.findOne({ _id: new ObjectId(id) });
        return record as ITaskModel;
    }
    async createTask(taskData: ITaskModel): Promise<ITaskModel> {
        this.logInfo(`Creating new Task ${taskData.title}`);
        try {
            const tasksCollection = await this.getTasksCollection();
            const insertResponse = await tasksCollection.insertOne(taskData);
            const id = insertResponse?.insertedId ?? null;
            if (id) {
                return this.getTasksById(id);
            }
            throw new InternalError("Could not insert task", HttpStatusCode.BAD_REQUEST);
        } catch (error) {
            this.logError(JSON.stringify(error));
            throw new DatabaseError(error.message, error.stack);
        }
    }
}