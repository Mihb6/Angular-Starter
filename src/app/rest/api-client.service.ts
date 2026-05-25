import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, firstValueFrom, map, Observable, OperatorFunction, throwError } from 'rxjs';
import { ApiClient } from './api-client';
import { ApiResponse, MultiPart, RequestConfig, RequestHeaders, RequestParamType } from "./rest.model";
import { inject, Injectable } from "@angular/core";
import { HttpError } from "./+common/http-error";
import { getHttpErrorType } from "./+common/HTTPErrorsEnum";
import { AuthenticationService } from "@wolkabout/commons";
import { ConfigService } from "../common/service/config.service";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService extends ApiClient {

  private readonly baseUrl;

  authenticationService = inject(AuthenticationService);

  constructor(private http: HttpClient, configService: ConfigService) {
    super();

    const restConfig = configService.getConfig().rest;

    if (!restConfig) {
      throw '[ApiClientService] - RestConfig must be provided from the application';
    }

    this.baseUrl = restConfig.baseUrl;
  }

  post<TRequest, TResponse>(path: string, body: TRequest, config?: RequestConfig): Observable<ApiResponse<TResponse>> {
    return this.http.post<TResponse>(`${this.baseUrl}${encodeURI(path)}`, body, this.formatJsonOptions(config)).pipe(this.mapJsonResponse(), this.parseError());
  }

  postWithFileResponse<TRequest>(path: string, body: TRequest, fileName: string, config?: RequestConfig): Observable<File> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestConfig: any = this.formatJsonOptions(config);
    requestConfig.responseType = 'arraybuffer';
    requestConfig.observe = 'body';
    return this.http.post(`${this.baseUrl}${path}`, body, requestConfig).pipe(map((response) => new File([new Blob([response])], fileName)), this.parseError());
  }

  put<TRequest, TResponse>(path: string, body: TRequest, config?: RequestConfig): Observable<ApiResponse<TResponse>> {
    return this.http.put<TResponse>(`${this.baseUrl}${encodeURI(path)}`, body, this.formatJsonOptions(config)).pipe(this.mapJsonResponse(), this.parseError());
  }

  delete<TResponse>(path: string, config?: RequestConfig): Observable<ApiResponse<TResponse>> {
    return this.http.delete<TResponse>(`${this.baseUrl}${encodeURI(path)}`, this.formatJsonOptions(config)).pipe(this.mapJsonResponse(), this.parseError());
  }

  get<TResponse>(path: string, config?: RequestConfig): Observable<ApiResponse<TResponse>> {
    if (this.hasJsonResponse(config)) {
      return this.http.get<TResponse>(`${this.baseUrl}${encodeURI(path)}`, this.formatJsonOptions(config)).pipe(this.mapJsonResponse(), this.parseError());
    } else {
      const options = {
        headers: this.wrapHeaders(config?.headers, config?.authenticated),
        params: this.beautifyParams(config?.params),
        observe: 'body' as const,
        responseType: 'json' as const,
      };

      return this.http.get(`${this.baseUrl}${path}`, options).pipe(
        map((response) => {
          const apiResponse: ApiResponse<TResponse> = {
            data: response as TResponse,
            headers: {},
          };

          return apiResponse;
        }),
        this.parseError()
      );
    }
  }

  getBlob<TResponse>(path: string, config?: RequestConfig): Observable<ApiResponse<TResponse>> {
    if (this.hasJsonResponse(config)) {
      return this.http.get<TResponse>(`${this.baseUrl}${encodeURI(path)}`, this.formatJsonOptions(config)).pipe(this.mapJsonResponse(), this.parseError());
    } else {
      const options = {
        headers: this.wrapHeaders(config?.headers, config?.authenticated),
        params: this.beautifyParams(config?.params),
        observe: 'body' as const,
        responseType: 'blob' as const,
      };

      return this.http.get(`${this.baseUrl}${encodeURI(path)}`, options).pipe(
        map((response) => {
          const apiResponse: ApiResponse<TResponse> = {
            data: response as TResponse,
            headers: {},
          };

          return apiResponse;
        }),
        this.parseError()
      );
    }
  }

  getFile(path: string, config?: RequestConfig): Observable<ApiResponse<Blob>> {
    const options = {
      headers: this.wrapHeaders(config?.headers, config?.authenticated),
      params: this.beautifyParams(config?.params),
      observe: 'response' as const,
      responseType: 'blob' as const,
    };

    const isInternalUrl = path.startsWith(`{{host}}`);
    const fullPath = isInternalUrl ? `${this.baseUrl}${encodeURI(path.substring(8))}` : path;

    return this.http.get(fullPath, options).pipe(
      map((response) => {
        if (response.body) {
          const apiResponse: ApiResponse<File> = {
            data: new File([response.body], response.headers.get('Content-Disposition') ?? 'unknown'),
            headers: {},
          };

          response.headers.keys().forEach((headerName) => {
            apiResponse.headers[headerName] = response.headers.get(headerName);
          });

          return apiResponse;
        } else {
          throw 'No file found';
        }
      }),
      this.parseError()
    );
  }

  postMultipart<TRequest extends MultiPart[], TResponse>(path: string, body: TRequest, config?: RequestConfig): Observable<ApiResponse<TResponse>> {
    const multiPartData = new FormData();

    body.forEach((part) => {
      if (typeof part.content === 'string') {
        multiPartData.append(part.name, new Blob([part.content], {type: 'application/json'}));
      } else {
        multiPartData.append(part.name, part.content, part.content.name);
      }
    });

    return this.http.post<TResponse>(`${this.baseUrl}${encodeURI(path)}`, multiPartData, this.formatJsonOptions(config)).pipe(this.mapJsonResponse(), this.parseError());
  }

  putMultipart<TRequest extends MultiPart[], TResponse>(path: string, body: TRequest, config?: RequestConfig): Observable<ApiResponse<TResponse>> {
    const multiPartData = new FormData();

    body.forEach((part) => {
      if (typeof part.content === 'string') {
        multiPartData.append(part.name, new Blob([part.content], {type: 'application/json'}));
      } else {
        multiPartData.append(part.name, part.content, part.content.name);
      }
    });

    return this.http.put<TResponse>(`${this.baseUrl}${encodeURI(path)}`, multiPartData, this.formatJsonOptions(config)).pipe(this.mapJsonResponse(), this.parseError());
  }

  getStream<TResponse>(method: 'GET' | 'POST', url: string, body?: any): Observable<TResponse> {
    return new Observable<TResponse>((subscriber) => {
      const reconnectDelay = 300_000;

      let reconnectTimer: any | null = null;
      let abortController: AbortController | null = null;
      let active = true; // Flip to false on unsubscribe to stop future reconnects

      const scheduleReconnect = () => {
        if (!active) return;
        if (reconnectTimer) clearTimeout(reconnectTimer);
        reconnectTimer = setTimeout(connect, reconnectDelay);
      };

      const connect = async () => {
        try {
          const token = await firstValueFrom(this.authenticationService.accessToken);
          abortController = new AbortController();

          console.log('✅ Subscribed to SSE stream:', url);
          const response = await fetch(`${this.baseUrl}${url}`, {
            method: method,
            body: !body ? null : JSON.stringify(body),
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'text/event-stream',
              "Content-Type": 'application/json'
            },
            signal: abortController.signal,
            cache: 'no-store',
          });

          if (!response.ok || !response.body) {
            throw new Error(`Unexpected SSE response: ${response.status} - ${response.statusText}`);
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          const processEvent = (rawEvent: string) => {
            // Normalize CRLF
            const lines = rawEvent.split(/\r?\n/);
            const dataParts: string[] = [];
            for (const line of lines) {
              if (!line || line.startsWith(':')) {
                continue; // Keep alive
              }

              const dataIndex = line.indexOf(':');
              const field = (dataIndex === -1 ? line : line.slice(0, dataIndex)).trim();
              const value = (dataIndex === -1 ? '' : line.slice(dataIndex + 1)).replace(/^\s/, '');
              if (field === 'data') {
                dataParts.push(value);
              }
            }

            if (dataParts.length) {
              const joined = dataParts.join('\n');
              try {
                const jsonData = JSON.parse(joined) as TResponse;
                // console.log('📦 SSE event', jsonData); // Use for debugging :)
                subscriber.next(jsonData);
              } catch (e) {
                console.warn('⚠️ Failed to parse SSE data as JSON:', joined, e);
              }
            }
          };

          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              buffer += decoder.decode();
              break;
            }
            buffer += decoder.decode(value, { stream: true });

            // Split on blank line (CRLF or LF)
            const parts = buffer.split(/\r?\n\r?\n/);
            for (let i = 0; i < parts.length - 1; i++) {
              processEvent(parts[i]);
            }
            buffer = parts[parts.length - 1];
          }

          if (buffer.trim().length) {
            // Data might be partial. Avoid processing unless it contains at least one `data:` line
            if (/^data:/m.test(buffer)) {
              processEvent(buffer);
            }
          }

          if (active) {
            console.warn('⚠️ SSE connection closed. Reconnecting…');
            scheduleReconnect();
          }
        } catch (error: any) {
          if (abortController?.signal.aborted) {
            // Normal shutdown
            return;
          }

          console.error('❌ SSE error:', error);
          if (active) {
            console.warn(`🔁 Retrying in ${Math.round(reconnectDelay / 1000)}s…`);
            scheduleReconnect();
          }
        }
      };

      connect();

      return () => {
        active = false;
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }

        if (abortController && !abortController.signal.aborted) {
          try { abortController.abort(); } catch { /* noop */ }
        }

        console.log('❌ SSE subscription stopped.');
      };
    });
  }

  mapJsonResponse<TResponse>() {
    return map((response: HttpResponse<TResponse>) => {
      const apiResponse: ApiResponse<TResponse> = {
        data: response.body,
        headers: {},
      };

      response.headers.keys().forEach((headerName) => {
        apiResponse.headers[headerName] = response.headers.get(headerName);
      });

      return apiResponse;
    });
  }

  parseError<TResponse>(): OperatorFunction<TResponse, TResponse> {
    return catchError((errorData: HttpErrorResponse) => {
      const {error} = errorData;

      try {
        let parsedError;
        try {
          parsedError = JSON.parse(error);

        } catch (e) {
          parsedError = error;
        }

        const mappedError = new HttpError();
        mappedError.code = errorData.status;
        mappedError.type = getHttpErrorType(errorData.status);
        mappedError.message = parsedError?.message ? parsedError.message : mappedError.type;
        mappedError.response = parsedError;
        mappedError.stack = `
          Type:${mappedError.type}
          Code:${mappedError.code},
          Message: ${mappedError.message}
          ${mappedError.stack}
        `;

        return throwError(() => mappedError as TResponse);
      } catch (e) {
        return throwError(() => e as TResponse);
      }
    });
  }

  private hasJsonResponse(config?: RequestConfig): boolean {
    return !config?.headers?.accept || config?.headers?.accept === 'application/json';
  }

  private formatJsonOptions(config?: RequestConfig) {
    return {
      headers: this.wrapHeaders(config?.headers, config?.authenticated),
      params: this.beautifyParams(config?.params),
      observe: 'response' as const,
    };
  }

  private wrapHeaders(headers?: RequestHeaders, authenticatedRequest?: boolean): HttpHeaders {
    const headerRecord: Record<string, string> = {
      Accept: headers?.accept ?? 'application/json',
    };

    if (headers?.contentType) {
      headerRecord['Content-Type'] = headers.contentType;
    }

    if (authenticatedRequest) {
      headerRecord['Authorization'] = ''; // Must be present so the interceptor fills the value.
    }

    if (headers?.otherHeaders) {
      Object.entries(headers?.otherHeaders).forEach(value => {
        headerRecord[value[0]] = value[1]
      })
    }

    return new HttpHeaders(headerRecord);
  }

  private beautifyParams(params?: { [key in string]: RequestParamType; }): HttpParams | undefined {
    let httpParams = new HttpParams();

    if (!params) {
      return httpParams;
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          httpParams = httpParams.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((arrayValue) => httpParams = httpParams.append(key, arrayValue))
        } else {
          throw Error(`Cannot convert to parameters: ${JSON.stringify(value)}`);
        }
      }
    });

    return httpParams;
  }
}
