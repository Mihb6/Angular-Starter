import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import { Document, DocumentCreationDetails, DocumentUpdateDetails } from "./semantic-document.model";

export class SemanticDocumentApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(semanticGuid: string): Observable<ApiResponse<Document[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.get<Document[]>(`/api/semantics/${semanticGuid}/documents`, config);
  }

  read(uuid: string): Observable<ApiResponse<Document>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.get<Document>(`/api/semanticDocuments/${uuid}`, config);
  }

  create(semanticGuid: string, creationDetails: DocumentCreationDetails, file: File | null, externalUrl: string | null): Observable<ApiResponse<Document>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    const parts: MultiPart[] = [];
    parts.push({name: 'creationDetails', content: JSON.stringify(creationDetails)});

    if (file) {
      parts.push({name: 'file', content: file});
    }

    if (externalUrl) {
      parts.push({name: 'externalUrl', content: JSON.stringify(externalUrl)});
    }

    return this.apiClient.postMultipart<MultiPart[], Document>(`/api/semantics/${semanticGuid}/documents`, parts, config);
  }

  renameDocument(uuid: string, newName: DocumentUpdateDetails): Observable<ApiResponse<Document>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.put<DocumentUpdateDetails, Document>(`/api/semanticDocuments/${uuid}/name`, newName, config);
  }

  changeDescription(uuid: string, newDescription: DocumentUpdateDetails): Observable<ApiResponse<Document>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.put<DocumentUpdateDetails, Document>(`/api/semanticDocuments/${uuid}/description`, newDescription, config);
  }

  getDocumentContent(uuid: string): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream'
      },
      authenticated: true,
    };

    return this.apiClient.getBlob<Blob>(`/api/semanticDocuments/${uuid}/content`, config);
  }

  delete(uuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.delete(`/api/semanticDocuments/${uuid}`, config);
  }

  deleteBulk(semanticGuid: string, uuids: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {uuids},
      authenticated: true,
    };

    return this.apiClient.delete(`/api/semantics/${semanticGuid}/documents`, config);
  }
}
