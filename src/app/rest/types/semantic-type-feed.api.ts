import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import {
  SemanticTypeFeedBulkDeleteQueryParameters,
  SemanticTypeFeed,
  SemanticTypeFeedQueryParameters,
  SemanticTypeFeedUpdateDetails,
  SemanticTypeFeedCreationDto, UpdateCategoriesQueryParameters
} from "./semantic-type-feed.model";
import { CategoryUpdateDto } from "../data/semantic-feed.model";

export class SemanticTypeFeedApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  read(typeGuid: string, feedName: string): Observable<ApiResponse<SemanticTypeFeed>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.get<SemanticTypeFeed>(`/api/semanticTypes/${typeGuid}/feeds/${feedName}`, config);
  }

  list(typeGuid: string, params?: SemanticTypeFeedQueryParameters): Observable<ApiResponse<SemanticTypeFeed[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<SemanticTypeFeed[]>(`/api/semanticTypes/${typeGuid}/feeds`, config);
  }

  /**
   * Creates a new synthetic semantic type feed.
   */
  createFeed(typeGuid: string, body: SemanticTypeFeedCreationDto): Observable<ApiResponse<SemanticTypeFeed>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<SemanticTypeFeedCreationDto, SemanticTypeFeed>(`/api/semanticTypes/${typeGuid}/feeds`, body, config);
  }

  updateComplete(typeGuid: string, feedName: string, body: SemanticTypeFeedUpdateDetails): Observable<ApiResponse<SemanticTypeFeed>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.put<SemanticTypeFeedUpdateDetails, SemanticTypeFeed>(`/api/semanticTypes/${typeGuid}/feeds/${feedName}`, body, config);
  }

  deleteOne(guid: string, feedName: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semanticTypes/${guid}/feeds/${feedName}`, config);
  }

  deleteMany(guid: string, feedNames: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        feedNames: feedNames
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semanticTypes/${guid}/feeds`, config);
  }

  updateCategories(typeGuid: string, feedName: string, body: CategoryUpdateDto, params?: UpdateCategoriesQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params: params,
      authenticated: true
    };

    return this.apiClient.put<CategoryUpdateDto, void>(`/api/semanticTypes/${typeGuid}/feeds/${feedName}/categories`, body, config);
  }
}
