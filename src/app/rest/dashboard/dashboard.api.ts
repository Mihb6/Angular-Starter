import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Dashboard, DashboardCreationDetails, DashboardUpdateDetails } from "./dashboard.model";

export class DashboardApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(): Observable<ApiResponse<Dashboard[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.dashboard.projection+json'
      },
      authenticated: true
    };

    return this.apiClient.get<Dashboard[]>(`/api/dashboards`, config);
  }

  listInScope(scopeGuid: string): Observable<ApiResponse<Dashboard[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.dashboard.projection+json'
      },
      authenticated: true
    };

    return this.apiClient.get<Dashboard[]>(`/api/semantics/${scopeGuid}/dashboards`, config);
  }

  get(guid: string): Observable<ApiResponse<Dashboard>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.dashboard.projection+json'
      },
      authenticated: true
    };

    return this.apiClient.get<Dashboard>(`/api/dashboards/${guid}`, config);
  }

  create(body: DashboardCreationDetails): Observable<ApiResponse<Dashboard>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<DashboardCreationDetails, Dashboard>(`/api/dashboards`, body, config)
  }

  duplicate(dashboardId: string, body: DashboardUpdateDetails): Observable<ApiResponse<Dashboard>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<DashboardUpdateDetails, Dashboard>(`/api/dashboards/${dashboardId}/duplicates`, body, config)
  }

  update(dashboardId: string, body: DashboardUpdateDetails): Observable<ApiResponse<Dashboard>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<DashboardUpdateDetails, Dashboard>(`/api/dashboards/${dashboardId}`, body, config)
  }

  delete(guid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/dashboards/${guid}`, config);
  }

  addToFavorites(guid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<void, void>(`/api/dashboards/${guid}/favorite`, undefined, config)
  }

  removeFromFavorites(guid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/dashboards/${guid}/favorite`, config)
  }
}
