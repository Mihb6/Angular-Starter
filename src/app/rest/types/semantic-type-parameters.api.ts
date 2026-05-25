import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { DeviceTypeParameter, DeviceTypeParameterQueryParameters } from "./semantic-type-parameters.model";

export class SemanticTypeParametersApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(guid: string, params?: DeviceTypeParameterQueryParameters): Observable<ApiResponse<DeviceTypeParameter[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<DeviceTypeParameter[]>(`/api/deviceTypes/${guid}/parameters`, config);
  }

  setDefaultValue(guid: string, parameterId: string, body: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<string, void>(`/api/deviceTypes/${guid}/parameters/${parameterId}`, body, config);
  }
}
