import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { StreamConfiguration, StreamingConfigurationDetails } from "../streaming/streaming-destination.model";

export class SemanticStreamingApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  /**
   * Configures a streaming destination for the semantic. Leaving feedNames empty will stream all feeds of the semantic.
   */
  create(semanticGuid: string, body: StreamingConfigurationDetails): Observable<ApiResponse<StreamConfiguration>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<StreamingConfigurationDetails, StreamConfiguration>(`/api/semantics/${semanticGuid}/streamingConfiguration`, body, config);
  }

  /**
   * Re-configures a streaming destination for the semantic. Leaving feedNames empty will stream all feeds of the semantic.
   */
  update(semanticGuid: string, configurationUuid: any, body: StreamingConfigurationDetails): Observable<ApiResponse<StreamConfiguration>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<StreamingConfigurationDetails, StreamConfiguration>(`/api/semantics/${semanticGuid}/streamingConfiguration/${configurationUuid}`, body, config);
  }

  /**
   * Removes the specified streaming configuration.
   */
  deleteOne(semanticGuid: string, configurationUuid: any): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semantics/${semanticGuid}/streamingConfiguration/${configurationUuid}`, config);
  }

  /**
   * Removes all specified streaming configurations for the semantic. Non-existent streaming configurations will be ignored.
   */
  deleteMany(semanticGuid: string, uuids: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        uuids: uuids
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semantics/${semanticGuid}/streamingConfiguration`, config);
  }

  /**
   * Retrieves a single streaming configuration.
   */
  read(semanticGuid: string, configurationUuid: any): Observable<ApiResponse<StreamConfiguration>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<StreamConfiguration>(`/api/semantics/${semanticGuid}/streamingConfiguration/${configurationUuid}`, config);
  }

  /**
   * Retrieves all streaming configurations for the specified semantic.
   */
  list(semanticGuid: string): Observable<ApiResponse<StreamConfiguration[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<StreamConfiguration[]>(`/api/semantics/${semanticGuid}/streamingConfiguration`, config);
  }
}
