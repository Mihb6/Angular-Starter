import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { EmailServer } from "./email-server.model";

export class EmailServerApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  read(): Observable<ApiResponse<EmailServer>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<EmailServer>(`/api/emailServer`, config);
  }

  update(body: EmailServer): Observable<ApiResponse<EmailServer>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<EmailServer, EmailServer>(`/api/emailServer`, body, config);
  }
}
