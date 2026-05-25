import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, RequestConfig } from "../rest.model";

export class ImageApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  getImage(url: string): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream'
      },
      authenticated: url.startsWith('{{host}}')
    };

    return this.apiClient.getFile(url, config);
  }
}
