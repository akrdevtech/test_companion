import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export interface IBaseApiClientConfigs {
  baseUrl: string;
  apiKey?: string;
}

export class BaseApiClient {
  private client: AxiosInstance;

  constructor(params: IBaseApiClientConfigs) {
    this.client = axios.create({
      baseURL: params.baseUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'x-api-key': params.apiKey,
      },
    });

    this.client.interceptors.request.use(request => {
      console.log(`[API BASE CLIENT] Starting Request ` + JSON.stringify(request));
      return request;
    });

    this.client.interceptors.response.use(response => {
      console.log(
        `[API BASE CLIENT] Response Received ` +
        JSON.stringify({
          status: response.status,
          data: response.data,
        }),
      );
      return response;
    });
  }

  private handleAxiosError(error: AxiosError) {
    throw new Error(`${error.message} 
    ${JSON.stringify(error.toJSON() as AxiosError)}`);
  }

  // AXIOS Response Type --> For Reference

  // interface AxiosResponse<T = any, D = any>  {
  //   data: T;
  //   status: number;
  //   statusText: string;
  //   headers: AxiosResponseHeaders;
  //   config: AxiosRequestConfig<D>;
  //   request?: any;
  // }

  // Mostly T in internal response is -->
  // {
  //   data: T -->{
  //     'status': 'OK',
  //     'txtd': 'string',
  //     ['key_name']: any
  //   }
  // }

  protected async getCall<T>(url: string): Promise<T | undefined> {
    try {
      const { data } = await this.client.get<T>(url);
      if (!data) throw new Error(`Data not received`);
      console.log(data);
      const responseBody: T = data;
      return responseBody;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }

  protected async postCall<T, R>(url: string, body: T): Promise<R | undefined> {
    try {
      const { data } = await this.client.post<T, AxiosResponse<R>>(url, body);
      console.log(data);
      const responseBody: R = data;
      return responseBody;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }

  protected async putCall<T, R>(url: string, body: T): Promise<R | undefined> {
    try {
      const { data } = await this.client.put<T, AxiosResponse<R>>(url, body);
      console.log(data);
      const responseBody: R = data;
      return responseBody;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }

  protected async patchCall<T, R>(url: string, body: T): Promise<R | undefined> {
    try {
      const { data } = await this.client.patch<T, AxiosResponse<R>>(url, body);
      console.log(data);
      const responseBody: R = data;
      return responseBody;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected async deleteCall<T>(url: string, args?: any): Promise<T | undefined> {
    try {
      const { data } = await this.client.delete<T>(url, {
        data: args,
      });
      if (!data) throw new Error(`Data not received`);
      console.log(data);
      const responseBody: T = data;
      return responseBody;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }
}
