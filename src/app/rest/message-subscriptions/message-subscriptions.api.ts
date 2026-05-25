import { ApiClient } from "../api-client";
import { Api } from "../api";
import { Observable } from "rxjs";
import { ApiResponse, Page, RequestConfig } from "../rest.model";
import { MessageSubscription, MessageSubscriptionUpsertDto } from "./message-subsctiptions.model";

export class MessageSubscriptionsApi extends Api {
  constructor(client: ApiClient) {
    super(client);
  }

  create(templateUuid: string, body: MessageSubscriptionUpsertDto): Observable<ApiResponse<MessageSubscription>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<MessageSubscriptionUpsertDto, MessageSubscription>(`/api/messageTemplates/${templateUuid}/subscriptions`, body, config);
  }

  update(uuid: string, body: MessageSubscriptionUpsertDto): Observable<ApiResponse<MessageSubscription>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<MessageSubscriptionUpsertDto, MessageSubscription>(`/api/subscriptions/${uuid}`, body, config);
  }

  getChannels(): Observable<ApiResponse<string[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.get<string[]>(`/api/subscriptions/channels`, config);
  }

  read(uuid: string): Observable<ApiResponse<MessageSubscription>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<MessageSubscription>(`/api/subscriptions/${uuid}`, config);
  }

  list(templateUuid: string): Observable<ApiResponse<MessageSubscription[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<MessageSubscription[]>(`/api/messageTemplates/${templateUuid}/subscriptions`, config);
  }

  delete(subscriptionUuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/subscriptions/${subscriptionUuid}`, config);
  }

  deleteBulk(uuids: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'APPLICATION/VND.BULK.OPERATION+JSON'
      },
      params: {uuids: uuids.join(',')},
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/subscriptions`, config);
  }
}
