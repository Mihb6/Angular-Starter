import { Api } from "../api";
import { ApiClient } from "../api-client";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import { Observable } from "rxjs";
import {
  AggregateReadingsQueryParameters,
  CategoryUpdateDto,
  DownloadRawDataParams,
  FeedCreationDetails,
  FeedMeta,
  FeedReference,
  FeedRenameDetails,
  Reading,
  ReadingBatch,
  SemanticFeedDetails,
  SemanticFeedMetaInScopeQueryParameters,
  SemanticFeedReadingsQueryParameters, SimpleReading
} from "./semantic-feed.model";

export class SemanticFeedApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  get(semanticGuid: string, feedName: string): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds/${feedName}`, config);
  }

  list(semanticGuid: string): Observable<ApiResponse<SemanticFeedDetails[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<SemanticFeedDetails[]>(`/api/semantics/${semanticGuid}/feeds`, config);
  }

  listReadings(semanticGuid: string, feedName: string, params?: SemanticFeedReadingsQueryParameters): Observable<ApiResponse<Reading[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        ...params,
      },
      authenticated: true
    };

    return this.apiClient.get<Reading[]>(`/api/semantics/${semanticGuid}/feeds/${feedName}/readings`, config);
  }

  listAggregateReadings(semanticGuid: string, feedName: string, params?: AggregateReadingsQueryParameters): Observable<ApiResponse<SimpleReading[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {
        feedName: feedName,
        ...params,
      },
      authenticated: true
    };

    return this.apiClient.get<SimpleReading[]>(`/api/semantics/${semanticGuid}/aggregate`, config);
  }

  setValue(semanticGuid: string, feedName: string, body: string): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<string, SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds/${feedName}`, body, config);
  }

  listMetaInScope(scopeGuid: string, params?: SemanticFeedMetaInScopeQueryParameters): Observable<ApiResponse<SemanticFeedDetails[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.feedMeta+json'
      },
      params,
      authenticated: true
    };

    return this.apiClient.get<SemanticFeedDetails[]>(`/api/semantics/${scopeGuid}/feeds`, config);
  }

  create(semanticGuid: string, body: FeedCreationDetails): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/vnd.completeCreation+json'
      },
      authenticated: true
    };

    return this.apiClient.post<FeedCreationDetails, SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds`, body, config);
  }

  delete(semanticGuid: string, feedName: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.delete<void>(`/api/semantics/${semanticGuid}/feeds/${feedName}`, config);
  }

  updatePrecision(semanticGuid: string, feedName: string, body: number | null): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<number | null, SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds/${feedName}/precision`, body, config)
  }

  updateRetention(semanticGuid: string, feedName: string, body: number | null): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<number | null, SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds/${feedName}/retention`, body, config)
  }

  updateCategories(semanticGuid: string, feedName: string, body: CategoryUpdateDto): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<CategoryUpdateDto, SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds/${feedName}/categories`, body, config);
  }

  updateName(semanticGuid: string, feedName: string, body: FeedRenameDetails): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<FeedRenameDetails, SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds/${feedName}/name`, body, config)
  }

  updateDescription(semanticGuid: string, feedName: string, body: FeedRenameDetails): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.put<FeedRenameDetails, SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds/${feedName}/description`, body, config)
  }

  downloadRawData(semanticGuid: string, feedName: string, params: DownloadRawDataParams): Observable<ApiResponse<Blob>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/octet-stream'
      },
      params,
      authenticated: true,
    };

    return this.apiClient.getFile(`{{host}}/api/semantics/${semanticGuid}/feeds/${feedName}/readings`, config);
  }

  importDataFromCsv(semanticGuid: string, feedName: string, locale: string, file: File): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {locale: locale},
      authenticated: true
    };

    const parts: MultiPart[] = [{name: 'file', content: file}];

    return this.apiClient.postMultipart<MultiPart[], SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds/${feedName}/importData`, parts, config);
  }

  copyData(semanticGuid: string, feedName: string, sourceFeed: FeedReference, from: number, to: number): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      params: {from: from, to: to},
      authenticated: true
    };

    return this.apiClient.post<FeedReference, SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds/${feedName}/copyData`, sourceFeed, config);
  }

  getFeedUpdates(semanticGuid: string, feedName: string): Observable<ReadingBatch> {
    return this.apiClient.getStream('GET', `/api/sse/semantics/${semanticGuid}/feeds?feedName=${encodeURIComponent(feedName)}`)
  }

  getFeedUpdatesForManyFeeds(feedReferences: FeedReference[]): Observable<ReadingBatch> {
    return this.apiClient.getStream('POST', `/api/sse/feeds`, feedReferences)
  }

  updateSource(semanticGuid: string, feedName: string, body: FeedReference | null): Observable<ApiResponse<SemanticFeedDetails>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true
    };

    return this.apiClient.put<FeedReference | null, SemanticFeedDetails>(`/api/semantics/${semanticGuid}/feeds/${feedName}/source`, body, config)
  }
}
