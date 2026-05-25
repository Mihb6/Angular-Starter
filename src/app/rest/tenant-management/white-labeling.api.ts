import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { WhiteLabeling } from "./tenant-management.model";

export class WhiteLabelingApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  getWhiteLabeling(): Observable<ApiResponse<WhiteLabeling>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<WhiteLabeling>(`/api/whiteLabeling/`, config);
  }

  getSignInImage(): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      authenticated: true
    };

    return this.apiClient.getBlob(`/api/whiteLabeling/signInImage`, config);
  }

  getFavicon(): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      authenticated: true
    };

    return this.apiClient.getBlob(`/api/whiteLabeling/favicon`, config);
  }

  getLogo(): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      authenticated: true
    };

    return this.apiClient.getBlob(`/api/whiteLabeling/logo`, config);
  }

  getDarkLogo(): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      authenticated: true
    };

    return this.apiClient.getBlob(`/api/whiteLabeling/logoDark`, config);
  }
}
