import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import { Document, DocumentCreationDetails, DocumentUpdateDetails } from "../data/semantic-document.model";

export class SemanticTypeDocumentApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(typeGuid: string): Observable<ApiResponse<Document[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.get<Document[]>(`/api/types/${typeGuid}/documents`, config);
  }

  read(uuid: string): Observable<ApiResponse<Document>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.get<Document>(`/api/typeDocuments/${uuid}`, config);
  }

  create(typeGuid: string, creationDetails: DocumentCreationDetails, file: File | null, externalUrl: string | null): Observable<ApiResponse<Document>> {
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

    return this.apiClient.postMultipart<MultiPart[], Document>(`/api/types/${typeGuid}/documents`, parts, config);
  }

  renameDocument(uuid: string, newName: DocumentUpdateDetails): Observable<ApiResponse<Document>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.put<DocumentUpdateDetails, Document>(`/api/typeDocuments/${uuid}/name`, newName, config);
  }

  changeDescription(uuid: string, newDescription: DocumentUpdateDetails): Observable<ApiResponse<Document>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.put<DocumentUpdateDetails, Document>(`/api/typeDocuments/${uuid}/description`, newDescription, config);
  }

  getDocumentContent(uuid: string): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream'
      },
      authenticated: true,
    };

    return this.apiClient.getBlob<Blob>(`/api/typeDocuments/${uuid}/content`, config);
  }

  delete(uuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.delete(`/api/typeDocuments/${uuid}`, config);
  }

  deleteBulk(typeGuid: string, uuids: string[]): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {uuids},
      authenticated: true,
    };

    return this.apiClient.delete(`/api/types/${typeGuid}/documents`, config);
  }
}
