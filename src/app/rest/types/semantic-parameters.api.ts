import { Api } from "../api";
import { ApiClient } from "../api-client";
import { DeviceParameter } from "./semantic-parameters.model";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { StringDto } from "../+common/common.model";

export class SemanticParametersApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(deviceKey: string): Observable<ApiResponse<DeviceParameter[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<DeviceParameter[]>(`/api/devices/${deviceKey}/parameters`, config);
  }

  setValue(deviceKey: string, key: string, body: StringDto): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'text/plain'
      },
      authenticated: true,
    };

    return this.apiClient.put<StringDto, void>(`/api/devices/${deviceKey}/parameters/${key}`, body, config);
  }
}
