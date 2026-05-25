import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { StreamConfiguration, StreamingConfigurationDetails } from "../streaming/streaming-destination.model";

export class SemanticTypeStreamingApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  /**
   * Configures a streaming destination for the semantic type. Leaving feedNames empty will stream all feeds of the typed semantic.
   */
  create(typeGuid: string, body: StreamingConfigurationDetails): Observable<ApiResponse<StreamConfiguration>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<StreamingConfigurationDetails, StreamConfiguration>(`/api/semanticTypes/${typeGuid}/streamingConfiguration`, body, config);
  }

  /**
   * Re-configures a streaming destination for the semantic type. Leaving feedNames empty will stream all feeds of the typed semantic.
   */
  update(typeGuid: string, configurationUuid: any, body: StreamingConfigurationDetails): Observable<ApiResponse<StreamConfiguration>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<StreamingConfigurationDetails, StreamConfiguration>(`/api/semanticTypes/${typeGuid}/streamingConfiguration/${configurationUuid}`, body, config);
  }

  /**
   * Removes the specified streaming configuration for the semantic type.
   */
  deleteOne(typeGuid: string, configurationUuid: any): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semanticTypes/${typeGuid}/streamingConfiguration/${configurationUuid}`, config);
  }

  /**
   * Removes all specified streaming configurations for the semantic type. Non-existent streaming configurations will be ignored.
   */
  deleteMany(typeGuid: string, uuids: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        uuids: uuids
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semanticTypes/${typeGuid}/streamingConfiguration`, config);
  }

  /**
   * Retrieves a single streaming configuration for the semantic type.
   */
  read(typeGuid: string, configurationUuid: any): Observable<ApiResponse<StreamConfiguration>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<StreamConfiguration>(`/api/semanticTypes/${typeGuid}/streamingConfiguration/${configurationUuid}`, config);
  }

  /**
   * Retrieves all streaming configurations for the specified semantic type.
   */
  list(typeGuid: string): Observable<ApiResponse<StreamConfiguration[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<StreamConfiguration[]>(`/api/semanticTypes/${typeGuid}/streamingConfiguration`, config);
  }
}
