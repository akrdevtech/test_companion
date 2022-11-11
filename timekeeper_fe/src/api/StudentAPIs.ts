import { BaseApiClient, IBaseApiClientConfigs } from "./BaseApiClient";

export class StudentAPIs extends BaseApiClient {
    constructor(studentApiConfigs: IBaseApiClientConfigs) {
        super(studentApiConfigs);
    }

    async fetchUserData(): Promise<any> {
        const responseData = await this.getCall<any>(`/healthcheck`);
        if (!responseData) throw new Error(`Error Fetching Bundle Details`);
        return responseData;
      }
}