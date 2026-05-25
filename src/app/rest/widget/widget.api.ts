import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import { Widget } from "./widget.model";

export class WidgetApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  create(dashboardUuid: string, body: Widget): Observable<ApiResponse<Widget>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<Widget, Widget>(`/api/dashboards/${dashboardUuid}/widgets`, body, config)
  }

  createWithFile(dashboardUuid: string, body: Widget, file: File | null): Observable<ApiResponse<Widget>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    const parts: MultiPart[] = [
      {name: 'widget', content: JSON.stringify(body)}
    ]

    if (file){
      parts.push({name: 'file', content: file})
    }

    return this.apiClient.postMultipart<MultiPart[], Widget>(`/api/dashboards/${dashboardUuid}/widgets`, parts, config)
  }

  update(body: Widget): Observable<ApiResponse<Widget>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<Widget, Widget>(`/api/widgets/${body.uuid}`, body, config)
  }

  delete(widgetUuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/widgets/${widgetUuid}`, config)
  }

  read(widgetUuid: string): Observable<ApiResponse<Widget>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<Widget>(`/api/widgets/${widgetUuid}`, config)
  }

  list(dashboardUuid: string): Observable<ApiResponse<Widget[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<Widget[]>(`/api/dashboards/${dashboardUuid}/widgets`, config)
  }

  getImage(widgetUuid: string): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream'
      },
      authenticated: true
    };

    return this.apiClient.getFile(`{{host}}/api/widgets/${widgetUuid}/image`, config);
  }

  updateImage(widgetUuid: string, image: File): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true,
    };

    const parts: MultiPart[] = [{name: 'image', content: image}];

    return this.apiClient.postMultipart(`/api/widgets/${widgetUuid}/image`, parts, config);
  }
}
