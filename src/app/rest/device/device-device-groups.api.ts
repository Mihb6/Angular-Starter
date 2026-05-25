import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { DeviceGroupDetails } from "./device-device-groups.model";

export class DeviceDeviceGroupsApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(deviceKey: string): Observable<ApiResponse<DeviceGroupDetails[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<DeviceGroupDetails[]>(`/api/devices/${deviceKey}/groups`, config);
  }
}
