import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { DeviceCredentialsDto, DeviceListQueryParameters } from "./device.model";
import { Semantic } from "../data/semantic.model";
import { StringDto } from "../+common/common.model";

export class DeviceApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(params?: DeviceListQueryParameters): Observable<ApiResponse<Semantic[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.completeRead+json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<Semantic[]>(`/api/devices`, config);
  }

  sendCredentialsEmail(credentials: DeviceCredentialsDto[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.post<DeviceCredentialsDto[], void>(`/api/devices/devicesEmail`, credentials, config);
  }

  resetPassword(guid: string, password: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true,
    };

    const body: StringDto = {
      data: password
    }

    return this.apiClient.put<StringDto, void>(`/api/devices/${guid}/password`, body, config);
  }
}
