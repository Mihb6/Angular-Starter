import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { EulaStatus } from "./eula.model";

export class EulaApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  getEulaStatus(): Observable<ApiResponse<EulaStatus>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
    };

    return this.apiClient.get<EulaStatus>(`/api/eula/status`, config);
  }

  getEulaDocument(): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'text/html'
      }
    };

    return this.apiClient.getBlob(`/api/eula/document`, config);
  }

  acceptEula(): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      authenticated: true
    };

    return this.apiClient.post<void, void>(`/api/eula`, undefined ,config);
  }
}
