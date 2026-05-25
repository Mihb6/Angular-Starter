import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
import { forkJoin, map, of } from "rxjs";
import { parseSelector } from "./feed-loader.service";

@Injectable({
  providedIn: 'root'
})
export class AttributeLoaderService {
  constructor(private apiService: ApiService) {
  }

  getMultiple(attributeSelectors: string[]) {
    if (!attributeSelectors?.length) {
      return of([]);
    }

    const requests = attributeSelectors.map((selector) => {
      const { semanticGuid, name } = parseSelector(selector);

      return forkJoin([
        this.apiService.semanticApi.get(semanticGuid).pipe(
          map((res) => res.data)
        ),
        this.apiService.semanticAttributeApi.read(semanticGuid, name).pipe(
          map((res) => res.data)
        )
      ]).pipe(
        map(([semantic, attribute]) => (attribute && semantic ? {
          ...attribute,
          semantic
        } : null))
      )
    });

    return forkJoin(requests).pipe(
      map((res) => res.filter((feed) => !!feed))
    )
  }
}
