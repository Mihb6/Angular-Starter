import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Licence } from "./licence.model";

export class LicenceApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  update(key: string): Observable<ApiResponse<Licence>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<string, Licence>(`/api/licences`, key, config);
  }

  setInitial(key: string): Observable<ApiResponse<Licence>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
    };

    return this.apiClient.post<string, Licence>(`/api/licences`, key, config);
  }
}
