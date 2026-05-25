import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { Semantic, SemanticCreationDetails, SemanticIntegrationGetMyRootSemanticsQueryParameters, SemanticIntegrationSubSemanticsQueryParameters, SemanticListQueryParameters, SemanticUpdateDetails } from "./semantic.model";
import { TypedSemanticCreationDetails } from "../types/semantic-type.model";

export class SemanticApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  /**
   * Returns the highest semantics user has access to.
   */
  getMyRootSemantics(params?: SemanticIntegrationGetMyRootSemanticsQueryParameters): Observable<ApiResponse<Semantic[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.completeRead+json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<Semantic[]>(`/api/semantics/roots`, config);
  }

  /**
   * Returns list of subs semantics with details.
   */
  listSubSemantics(parentGuid: string, params?: SemanticIntegrationSubSemanticsQueryParameters): Observable<ApiResponse<Semantic[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.completeRead+json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<Semantic[]>(`/api/semantics/${parentGuid}/subSemantics`, config);
  }

  /**
   * Returns list of semantics .
   */
  list(params?: SemanticListQueryParameters): Observable<ApiResponse<Semantic[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<Semantic[]>(`/api/semantics`, config);
  }

  /**
   * Returns list of semantics.
   */
  integrationList(guids: string[]): Observable<ApiResponse<Semantic[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        guids: guids
      },
      authenticated: true
    };

    return this.apiClient.get<Semantic[]>(`/api/semantics`, config);
  }

  /**
   * Returns all semantic properties as well as feeds and attributes.
   */
  get(guid: string): Observable<ApiResponse<Semantic>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.completeRead+json'
      },
      authenticated: true
    };

    return this.apiClient.get<Semantic>(`/api/semantics/${guid}`, config);
  }

  create(parentGuid: string | null, body: SemanticCreationDetails): Observable<ApiResponse<Semantic>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        parentGuid
      },
      authenticated: true
    };

    return this.apiClient.post<SemanticCreationDetails, Semantic>(`/api/semantics`, body, config)
  }

  createTyped(typeGuid: string | null, body: TypedSemanticCreationDetails, parentGuid?: string): Observable<ApiResponse<Semantic>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params: {
        parentGuid
      },
      authenticated: true
    };

    return this.apiClient.post<TypedSemanticCreationDetails, Semantic>(`/api/semanticTypes/${typeGuid}/semantics`, body, config)
  }

  update(guid: string, body: SemanticUpdateDetails): Observable<ApiResponse<Semantic>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.put<SemanticUpdateDetails, Semantic>(`/api/semantics/${guid}`, body, config);
  }

  move(guid: string, newParentGuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.put<string, void>(`/api/semantics/${guid}/parent`, newParentGuid, config);
  }

  delete(guid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.completeDeletion+json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semantics/${guid}`, config);
  }

  getAssetPermissions(guid: string): Observable<ApiResponse<string[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        assetType: 'SEMANTIC',
        assetGuid: guid
      },
      authenticated: true
    };

    return this.apiClient.get<string[]>(`/api/accesses/myPermissions`, config);
  }
}
