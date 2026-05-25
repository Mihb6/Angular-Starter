import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import {
  StreamingDestination,
  StreamingDestinationConfiguration,
  StreamingDestinationCreationDetails,
  StreamingDestinationReference,
  StreamingDestinationStatusUpdate
} from "./streaming-destination.model";
import { Observable } from "rxjs";

export class StreamingDestinationApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  /**
   * Configures a streaming destination so that it can be used by semantics and types.
   */
  create(body: StreamingDestinationCreationDetails): Observable<ApiResponse<StreamingDestination>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.post<StreamingDestinationCreationDetails, StreamingDestination>(`/api/streamingDestinations`, body, config);
  }

  /**
   * Updates a streaming destination.
   */
  update(uuid: any, body: StreamingDestinationConfiguration): Observable<ApiResponse<StreamingDestination>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<StreamingDestinationConfiguration, StreamingDestination>(`/api/streamingDestinations/${uuid}`, body, config);
  }

  /**
   * Updates a streaming destination status.
   */
  updateStatus(uuid: any, body: StreamingDestinationStatusUpdate): Observable<ApiResponse<StreamingDestination>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<StreamingDestinationStatusUpdate, StreamingDestination>(`/api/streamingDestinations/${uuid}/status`, body, config);
  }

  /**
   * Deletes the specified streaming destination
   */
  deleteOne(uuid: any): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.delete<void>(`/api/streamingDestinations/${uuid}`, config);
  }

  /**
   * Deletes all specified streaming destination
   */
  deleteMany(destinationUuids: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        destinationUuid: destinationUuids
      },
      authenticated: true,
    };

    return this.apiClient.delete<void>(`/api/streamingDestinations`, config);
  }

  /**
   * Retrieves the specified streaming destination and their configurations
   */
  read(uuid: any): Observable<ApiResponse<StreamingDestination>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<StreamingDestination>(`/api/streamingDestinations/${uuid}`, config);
  }

  /**
   * Retrieves all streaming destinations and their configurations.
   */
  list(): Observable<ApiResponse<StreamingDestination[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<StreamingDestination[]>(`/api/streamingDestinations`, config);
  }

  /**
   * Retrieves all streaming destinations references (UUID with name) without configurations. This endpoint doesn't require special permissions.
   */
  listReferences(): Observable<ApiResponse<StreamingDestinationReference[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.reference+json'
      },
      authenticated: true
    };

    return this.apiClient.get<StreamingDestinationReference[]>(`/api/streamingDestinations`, config);
  }
}
