import { Api } from "../api";
import { ApiClient } from "../api-client";
import { Observable } from "rxjs";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import { ReadingType, ReadingTypeCreationDto, ReadingTypeUpdateDto } from "./reading-type.model";

export class ReadingTypeApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  list(): Observable<ApiResponse<ReadingType[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<ReadingType[]>(`/api/readingTypes`, config);
  }

  getReadingType(guid: string): Observable<ApiResponse<ReadingType>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<ReadingType>(`/api/readingTypes/${guid}`, config);
  }

  createReadingType(body: ReadingTypeCreationDto): Observable<ApiResponse<ReadingType>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<ReadingTypeCreationDto, ReadingType>(`/api/readingTypes`, body, config);
  }

  updateReadingType(guid: string, body: ReadingTypeUpdateDto): Observable<ApiResponse<ReadingType>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<ReadingTypeUpdateDto, ReadingType>(`/api/readingTypes/${guid}`, body, config);
  }

  changeVisibility(guid: string, publishStatus: boolean): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<boolean, void>(`/api/readingTypes/${guid}/published`, publishStatus, config);
  }

  deleteReadingType(guid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/readingTypes/${guid}`, config);
  }

  export(guids: string[]): Observable<ApiResponse<ReadingType[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      params: {guids},
      authenticated: true
    };

    return this.apiClient.get<ReadingType[]>(`/api/readingTypes/export`, config);
  }

  importFromJson(file: File): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      authenticated: true
    };

    const parts: MultiPart[] = [{name: 'file', content: file}];

    return this.apiClient.postMultipart<MultiPart[], void>(`/api/readingTypes/import`, parts, config);
  }
}
