import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";

export class DashboardDataApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  getBackgroundImage(dashboardUuid: string): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream'
      },
      authenticated: true
    };

    return this.apiClient.getFile(`{{host}}/api/dashboards/${dashboardUuid}/backgroundImage`, config);
  }

  saveBackgroundImage(dashboardId: string, file: File): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    const parts: MultiPart[] = [{name: 'backgroundImage', content: file}];
    return this.apiClient.postMultipart<MultiPart[], void>(`/api/dashboards/${dashboardId}/backgroundImage`, parts, config);
  }

  deleteBackgroundImage(dashboardId: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/dashboards/${dashboardId}/backgroundImage`, config);
  }
}
