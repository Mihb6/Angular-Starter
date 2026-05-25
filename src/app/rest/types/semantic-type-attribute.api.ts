import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { SemanticTypeAttribute, TypeAttributeCreationDetails, TypeAttributeDescriptionDetails } from "./semantic-type-attribute.model";

export class SemanticTypeAttributeApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  read(typeGuid: string, name: string): Observable<ApiResponse<SemanticTypeAttribute>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.get<SemanticTypeAttribute>(`/api/semanticTypes/${typeGuid}/attributes/${name}`, config);
  }

  list(guid: string): Observable<ApiResponse<SemanticTypeAttribute[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticTypeAttribute[]>(`/api/semanticTypes/${guid}/attributes`, config);
  }

  create(guid: string, dto: TypeAttributeCreationDetails): Observable<ApiResponse<SemanticTypeAttribute>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.post<TypeAttributeCreationDetails, SemanticTypeAttribute>(`/api/semanticTypes/${guid}/attributes`, dto, config);
  }

  delete(guid: string, names: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        attributeNames: names
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semanticTypes/${guid}/attributes`, config);
  }

  update(guid: string, attributeName: string, body: SemanticTypeAttribute): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<SemanticTypeAttribute, void>(`/api/semanticTypes/${guid}/attributes/${attributeName}`, body, config);
  }

  updateDescription(typeGuid: string, attributeName: string, body: TypeAttributeDescriptionDetails): Observable<ApiResponse<SemanticTypeAttribute>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<TypeAttributeDescriptionDetails, SemanticTypeAttribute>(`/api/semanticTypes/${typeGuid}/attributes/${attributeName}/description`, body, config);
  }
}
