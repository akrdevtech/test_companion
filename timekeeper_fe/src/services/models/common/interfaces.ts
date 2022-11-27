import { IListPagination } from "../../../common/interface/global";


export interface IGenericApiResponseSchema {
    status: string;
    txId: string;
}

export interface IPaginatedData<T> {
    documents: T[];
    pagination: IListPagination
}