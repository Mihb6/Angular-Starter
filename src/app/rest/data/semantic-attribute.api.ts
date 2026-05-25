import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { AttributeCreationDetails, AttributeDescriptionDetails, SemanticAttributeDetails } from "./semantic-attribute.model";
import { SemanticCreationDetails } from "./semantic.model";

export class SemanticAttributeApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  read(semanticGuid: string, attributeGuid: string): Observable<ApiResponse<SemanticAttributeDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.get<SemanticAttributeDetails>(`/api/semantics/${semanticGuid}/attributes/${attributeGuid}`, config);
  }

  update(semanticGuid: string, attributeGuid: string, body: SemanticCreationDetails): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<SemanticCreationDetails, void>(`/api/semantics/${semanticGuid}/attributes/${attributeGuid}`, body, config);
  }

  updateValue(semanticGuid: string, attributeGuid: string, body: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<string, void>(`/api/semantics/${semanticGuid}/attributes/${attributeGuid}/value`, body, config);
  }

  updateDescription(semanticGuid: string, attributeName: string, body: AttributeDescriptionDetails): Observable<ApiResponse<SemanticAttributeDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<AttributeDescriptionDetails, SemanticAttributeDetails>(`/api/semantics/${semanticGuid}/attributes/${attributeName}/description`, body, config);
  }

  delete(semanticGuid: string, attributeName: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.delete<void>(`/api/semantics/${semanticGuid}/attributes/${attributeName}`, config);
  }

  createAttribute(semanticGuid: string, body: any): Observable<ApiResponse<SemanticAttributeDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<AttributeCreationDetails, SemanticAttributeDetails>(`/api/semantics/${semanticGuid}/attributes`, body, config);
  }

  listAttributes(semanticGuid: string): Observable<ApiResponse<SemanticAttributeDetails[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticAttributeDetails[]>(`/api/semantics/${semanticGuid}/attributes`, config);
  }
}
