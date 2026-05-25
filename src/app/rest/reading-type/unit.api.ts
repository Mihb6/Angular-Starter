import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import { Unit, UnitBulkQueryParameters, UnitDetails, UnitQueryParameters, UnitSystem } from "./unit.model";

export class UnitApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  createUnit(guid: string, body: UnitDetails): Observable<ApiResponse<Unit>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<UnitDetails, Unit>(`/api/readingTypes/${guid}/units`, body, config);
  }

  update(guid: string, body: UnitDetails): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<UnitDetails, void>(`/api/units/${guid}`, body, config);
  }

  checkUnitSymbol(guid: string, body: string): Observable<ApiResponse<UnitSystem>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.post<string, UnitSystem>(`/api/readingTypes/${guid}/checkSymbol`, body, config);
  }

  read(guid: string): Observable<ApiResponse<Unit>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<Unit>(`/api/units/${guid}`, config);
  }

  list(params?: UnitQueryParameters): Observable<ApiResponse<Unit[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<Unit[]>(`/api/units`, config);
  }

  listAll(): Observable<ApiResponse<UnitDetails[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.minimal+json'
      },
      authenticated: true
    };

    return this.apiClient.get<UnitDetails[]>(`/api/units`, config);
  }

  deleteMany(params?: UnitBulkQueryParameters): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/units`, config);
  }

  changeVisibility(params: UnitBulkQueryParameters, body: boolean): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/vnd.bulk.operation+json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.put<boolean, void>(`/api/units/published`, body, config);
  }
}
