import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { DeviceGroup, DeviceGroupCreationDto, DeviceGroupsDevicesListQueryParameters, DeviceGroupsListQueryParameters } from "./device-groups.model";
import { Semantic } from "../data/semantic.model";

export class DeviceGroupsApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(): Observable<ApiResponse<DeviceGroup[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<DeviceGroup[]>(`/api/deviceGroups`, config);
  }

  get(uuid: string): Observable<ApiResponse<DeviceGroup>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<DeviceGroup>(`/api/deviceGroups/${uuid}`, config);
  }

  listMembers(uuid: string): Observable<ApiResponse<Semantic[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.completeRead+json'
      },
      authenticated: true
    };

    return this.apiClient.get<Semantic[]>(`/api/deviceGroups/${uuid}/members`, config);
  }

  updateName(uuid: string, body: string): Observable<ApiResponse<DeviceGroup>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<string, DeviceGroup>(`/api/deviceGroups/${uuid}/name`, body, config);
  }


  update(uuid: string, body: DeviceGroupCreationDto): Observable<ApiResponse<DeviceGroup>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<DeviceGroupCreationDto, DeviceGroup>(`/api/deviceGroups/${uuid}`, body, config);
  }

  create(body: DeviceGroupCreationDto): Observable<ApiResponse<DeviceGroup>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<DeviceGroupCreationDto, DeviceGroup>(`/api/deviceGroups`, body, config);
  }

  delete(uuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/deviceGroups/${uuid}`, config);
  }

  addDevicesToGroups(uuid: string, body: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/vnd.bulk.operation+json'
      },
      authenticated: true
    };

    return this.apiClient.post<string[], void>(`/api/deviceGroups/${uuid}/devices`, body, config);
  }

  removeDevicesFromGroups(uuid: string, deviceKeys: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.bulk.operation+json',
      },
      params: {
        deviceKeys
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/deviceGroups/${uuid}/devices`, config);
  }

  getAssetPermissions(uuid: string): Observable<ApiResponse<string[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        assetType: 'DEVICE_GROUP',
        assetGuid: uuid
      },
      authenticated: true
    };

    return this.apiClient.get<string[]>(`/api/accesses/myPermissions`, config);
  }
}
