import { ApiClient } from "../api-client";
import { Api } from "../api";
import { MessageTemplate, UpsertMessageTemplateDto } from "./message-templates.model";
import { Observable } from "rxjs";
import { ApiResponse, Page, RequestConfig } from "../rest.model";

export class MessageTemplatesApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  create(body: UpsertMessageTemplateDto): Observable<ApiResponse<MessageTemplate>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<UpsertMessageTemplateDto, MessageTemplate>(`/api/messageTemplates`, body, config);
  }

  update(uuid: string, body: UpsertMessageTemplateDto): Observable<ApiResponse<MessageTemplate>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<UpsertMessageTemplateDto, MessageTemplate>(`/api/messageTemplates/${uuid}`, body, config);
  }

  read(uuid: string): Observable<ApiResponse<MessageTemplate>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<MessageTemplate>(`/api/messageTemplates/${uuid}`, config);
  }

  list(): Observable<ApiResponse<MessageTemplate[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<MessageTemplate[]>(`/api/messageTemplates`, config);
  }

  delete(uuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/messageTemplates/${uuid}`, config);
  }
}
