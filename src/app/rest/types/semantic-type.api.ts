import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import {
  SemanticType,
  SemanticTypeCreationDetails,
  SemanticTypeImportExportDto,
  SemanticTypeImportTypesFromFileQueryParameters,
  SemanticTypeQueryParameters,
  SemanticTypeUpdateDetails,
  TypedSemanticCreationDetails
} from "./semantic-type.model";
import { Semantic } from "../data/semantic.model";
import { NumberDto } from "../+common/common.model";

export class SemanticTypeApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(params?: SemanticTypeQueryParameters): Observable<ApiResponse<SemanticType[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<SemanticType[]>(`/api/semanticTypes`, config);
  }

  listChildTypes(typeGuid: string, params?: SemanticTypeQueryParameters): Observable<ApiResponse<SemanticType[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {typeGuid: typeGuid, classification: params?.classification},
      authenticated: true
    };

    return this.apiClient.get<SemanticType[]>(`/api/semanticTypes/childTypes`, config);
  }

  create(body: SemanticTypeCreationDetails): Observable<ApiResponse<SemanticType>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<SemanticTypeCreationDetails, SemanticType>(`/api/semanticTypes`, body, config);
  }

  clone(guid: string, name: string): Observable<ApiResponse<SemanticType>> {
    const config: RequestConfig = {
      headers: {
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<string, SemanticType>(`/api/semanticTypes/${guid}/clones`, name, config);
  }

  read(guid: string): Observable<ApiResponse<SemanticType>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticType>(`/api/semanticTypes/${guid}`, config);
  }

  delete(guid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semanticTypes/${guid}`, config);
  }

  update(guid: string, body: SemanticTypeUpdateDetails): Observable<ApiResponse<SemanticType>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<SemanticTypeUpdateDetails, SemanticType>(`/api/semanticTypes/${guid}`, body, config);
  }

  publish(guid: string, body: boolean): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<boolean, void>(`/api/semanticTypes/${guid}/published`, body, config);
  }

  /**
   * Imports semantic types from file. If units required are missing import will not be successful.
   */
  importFromFile(params?: SemanticTypeImportTypesFromFileQueryParameters): Observable<ApiResponse<SemanticType[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    const parts: MultiPart[] = [];

    if (params?.file) {
      parts.push(params?.file)
    }

    return this.apiClient.postMultipart(`/api/semanticTypes/import`, parts, config);
  }

  /**
   * Exports semantic types based on Ids.
   */
  export(ids: string[]): Observable<ApiResponse<SemanticTypeImportExportDto[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.bulk.operation+json',
      },
      params: {ids},
      authenticated: true
    };

    return this.apiClient.get<SemanticTypeImportExportDto[]>(`/api/semanticTypes/export`, config);
  }

  /**
   * Uploads the icon for the semantic type.
   */
  uploadSemanticTypeIcon(guid: string, icon: MultiPart): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    const parts: MultiPart[] = [];
    parts.push(icon);

    return this.apiClient.postMultipart<MultiPart[], void>(`/api/semanticTypes/${guid}/icon`, parts, config);
  }

  /**
   * Retrieves the icon for the semantic type.
   */
  getSemanticTypeIcon(guid: string): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream'
      },
      authenticated: true,
    };

    return this.apiClient.getBlob<Blob>(`/api/semanticTypes/${guid}/icon`, config);
  }

  getAssetPermissions(guid: string): Observable<ApiResponse<string[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        assetType: 'SEMANTIC_TYPE',
        assetGuid: guid
      },
      authenticated: true
    };

    return this.apiClient.get<string[]>(`/api/accesses/myPermissions`, config);
  }

  createSemantic(typeGuid: string, parentGuid: string, body: TypedSemanticCreationDetails): Observable<ApiResponse<Semantic>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params: {
        parentGuid: parentGuid
      }
    };

    return this.apiClient.post<TypedSemanticCreationDetails, Semantic>(`/api/semanticTypes/${typeGuid}/semantics`, body, config);
  }

  getUsageCountOfSemantics(typeGuid: string): Observable<ApiResponse<NumberDto>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<NumberDto>(`/api/semanticTypes/${typeGuid}/usageCount`, config);
  }
}
