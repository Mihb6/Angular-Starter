import { ApiClient } from "../api-client";
import { Api } from "../api";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";
import { WhiteLabeling } from "../tenant-management/tenant-management.model";

export class WhiteLabelingInfoApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  getWhiteLabeling(url?: string): Observable<ApiResponse<WhiteLabeling>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        url
      }
    };

    return this.apiClient.get<WhiteLabeling>(`/api/whiteLabelingInfo/whiteLabeling`, config);
  }

  getSignInImage(url?: string): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      params: {
        url
      }
    };

    return this.apiClient.getBlob(`/api/whiteLabelingInfo/signInImage`, config);
  }

  getFavicon(url?: string): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      params: {
        url
      }
    };

    return this.apiClient.getBlob(`/api/whiteLabelingInfo/favicon`, config);
  }

  getLogo(url?: string): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      params: {
        url
      }
    };

    return this.apiClient.getBlob(`/api/whiteLabelingInfo/logo`, config);
  }

  getDarkLogo(url?: string): Observable<ApiResponse<BlobPart>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream',
      },
      params: {
        url
      }
    };

    return this.apiClient.getBlob(`/api/whiteLabelingInfo/logoDark`, config);
  }
}
