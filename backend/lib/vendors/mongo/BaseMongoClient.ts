import { BaseMongoClient as MongoClient } from '@akrdevtech/lib-mongodb-with-migrate';
import { Collection } from 'mongodb';

export declare type Sort = string | Exclude<SortDirection, { $meta: string; }> | string[] | { [key: string]: SortDirection; } | Map<string, SortDirection> | [string, SortDirection][] | [string, SortDirection];

/** @public */
export declare type SortDirection = 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending' | { $meta: string; };

export class BaseMongoClient extends MongoClient {
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
        .skip((page - 1) * limit)
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
