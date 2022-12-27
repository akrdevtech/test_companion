import { BaseMongoClient as MongoClient, IMongoConfig } from '@akrdevtech/lib-mongodb-with-migrate';
import { IAppFeatures } from '../../interfaces/AppFeatures';
import { Collection } from 'mongodb';

export declare type Sort = string | Exclude<SortDirection, { $meta: string; }> | string[] | { [key: string]: SortDirection; } | Map<string, SortDirection> | [string, SortDirection][] | [string, SortDirection];

/** @public */
export declare type SortDirection = 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending' | { $meta: string; };

export interface IBaseMongoClientOptions {
  moduleName: string;
}
export class BaseMongoClient extends MongoClient {
  protected appLogger: IAppFeatures["AppLoger"];
  protected moduleName: string;

  constructor(mongoConfig: IMongoConfig, appFeatures?: IAppFeatures, options?: IBaseMongoClientOptions) {
    super(mongoConfig);
    this.appLogger = appFeatures.AppLoger;
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

  /**
   * Get Paginated Result
   * @param collection Specify the collection instance to get the result from
   * @param query filter query object
   * @param sort sort query object
   * @param page specify the page number
   * @param limit limit the result per page
   * @returns PaginatedResult {document, pagination: {page, limit, totalCount, totalPages}}
   */
  protected async paginateFindQuery<T>(
    collection: Collection<T>,
    query: Record<string, unknown>,
    sort: Sort,
    sortDirection: SortDirection,
    page: number,
    limit: number,
  ): Promise<IDbPaginatedData<T>> {
    const cursor = await collection.find(query);
    const [documents, totalCount] = await Promise.all([
      cursor
        .sort(sort, sortDirection)
        .skip((page) * limit)
        .limit(limit)
        .toArray(),
      collection.count(query),
    ]);

    return {
      documents,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }
}

export interface IDbPaginatedData<T> {
  documents: any[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}
