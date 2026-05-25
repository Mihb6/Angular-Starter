import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { SemanticType } from "./semantic-type.model";
import {
  SemanticTypeHierarchyUnAllowChildQueryParameters,
  SemanticTypeHierarchyUnAllowParentQueryParameters,
  SemanticTypeHierarchyUnDefineSpecificChildQueryParameters,
  SemanticTypeSpecificChildCreationDto,
  SemanticTypeSpecificChildDto
} from "./semantic-type-hierarchy.model";

export class SemanticTypeHierarchyApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  listAllowedChildren(guid: string): Observable<ApiResponse<SemanticType[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticType[]>(`/api/semanticTypes/${guid}/allowedChildren`, config);
  }

  listAllowedParents(guid: string): Observable<ApiResponse<SemanticType[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticType[]>(`/api/semanticTypes/${guid}/allowedParents`, config);
  }

  listSpecificChildren(guid: string): Observable<ApiResponse<SemanticTypeSpecificChildDto[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticTypeSpecificChildDto[]>(`/api/semanticTypes/${guid}/specificChildren`, config);
  }

  allowChild(guid: string, childGuid: string): Observable<ApiResponse<number>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<string, number>(`/api/semanticTypes/${guid}/allowedChildren`, childGuid, config);
  }

  allowParent(guid: string, parentGuid: string): Observable<ApiResponse<number>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<string, number>(`/api/semanticTypes/${guid}/allowedParents`, parentGuid, config);
  }

  defineSpecificChild(guid: string, body: SemanticTypeSpecificChildCreationDto): Observable<ApiResponse<number>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<SemanticTypeSpecificChildCreationDto, number>(`/api/semanticTypes/${guid}/specificChildren`, body, config);
  }

  unAllowChild(guid: string, params?: SemanticTypeHierarchyUnAllowChildQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semanticTypes/${guid}/allowedChildren`, config);
  }

  unAllowParent(guid: string, params?: SemanticTypeHierarchyUnAllowParentQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semanticTypes/${guid}/allowedParents`, config);
  }

  unDefineSpecificChild(guid: string, params?: SemanticTypeHierarchyUnDefineSpecificChildQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semanticTypes/${guid}/specificChildren`, config);
  }
}
