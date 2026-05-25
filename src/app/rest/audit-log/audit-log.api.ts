import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, Page, RequestConfig } from "../rest.model";
import { AuditLog, AuditLogQueryParams, AuditLogPageParameters } from "./audit-log.model";

export class AuditLogApi extends Api {
  constructor(client: ApiClient) {
    super(client);
  }

  list(params: AuditLogQueryParams): Observable<ApiResponse<AuditLog[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<AuditLog[]>(`/api/auditLogs`, config);
  }

  page(params: AuditLogPageParameters): Observable<ApiResponse<Page<AuditLog>>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.page+json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<Page<AuditLog>>(`/api/auditLog`, config);
  }
}
