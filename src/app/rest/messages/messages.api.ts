import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, Page, RequestConfig } from "../rest.model";
import { Message, MessageMessagesFilter } from "./messages.model";

export class MessagesApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  pageMessages(params?: MessageMessagesFilter): Observable<ApiResponse<Page<Message>>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<Page<Message>>(`/api/messages`, config);
  }

  markMessagesRead(body: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<string[], void>(`/api/messages/markAsRead`, body, config);
  }

  getMessageUpdatesForScope(semanticGuid: string): Observable<Message> {
    return this.apiClient.getStream('GET', `/api/sse/semantics/${semanticGuid}/messages`)
  }

  getMessageUpdates(): Observable<Message> {
    return this.apiClient.getStream('GET', `/api/sse/messages`)
  }
}
