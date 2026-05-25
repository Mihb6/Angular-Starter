import {Api} from "../api";
import {ApiClient} from "../api-client";
import {Observable} from "rxjs";
import {ApiResponse, RequestConfig} from "../rest.model";
import {
  Rule,
  AdvancedRuleCreationDto,
  RuleStatus,
  ExecutionLogDto
} from "./rule-engine.model";

export class RuleEngineApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  read(uuid: string): Observable<ApiResponse<Rule>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<Rule>(`/api/advancedRules/${uuid}`, config);
  }


  list(): Observable<ApiResponse<Rule[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<Rule[]>(`/api/advancedRules`, config);
  }

  create(body: AdvancedRuleCreationDto): Observable<ApiResponse<Rule>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.post<AdvancedRuleCreationDto, Rule>(`/api/advancedRules`, body, config);
  }

  update(uuid: string, body: AdvancedRuleCreationDto): Observable<ApiResponse<Rule>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.put<AdvancedRuleCreationDto, Rule>(`/api/advancedRules/${uuid}`, body, config);
  }

  delete(uuid: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/advancedRules/${uuid}`, config);
  }

  setStatus(uuid: string, body: RuleStatus): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.put<string, void>(`/api/advancedRules/${uuid}/status`, JSON.stringify(body), config);
  }

  setTraced(uuid: string, body: boolean): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.put<boolean, void>(`/api/advancedRules/${uuid}/traced`, body, config);
  }

  /**
   * Returns the full execution log of the rule.
   * There is also a partial retrieval API that can be used instead of this one.
   */
  getExecutionLog(uuid: string): Observable<ApiResponse<ExecutionLogDto[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
    };

    return this.apiClient.get<ExecutionLogDto[]>(`/api/advancedRules/${uuid}/executionLog`, config);
  }
}
