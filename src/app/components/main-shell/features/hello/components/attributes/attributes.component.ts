import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../../common/service/api.service';
import { ApiResponse } from '../../../../../../rest/rest.model';
import { AppAttribute } from '../../types';
import { Subject, takeUntil, catchError, of } from 'rxjs';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeDetailComponent } from './attribute-detail/attribute-detail.component';
import { SemanticAttributeDetails } from '../../../../../../rest/data/semantic-attribute.model';
import { Semantic } from '../../../../../../rest/data/semantic.model';

const DEVICE_ID = '13c357a9-ce4d-4377-abc6-1689709907c1';

@Component({
  selector: 'app-attributes',
  standalone: true,
  imports: [AttributeListComponent, AttributeDetailComponent],
  templateUrl: './attributes.component.html',
  styleUrl: './attributes.component.scss',
})
export class AttributesComponent implements OnInit, OnDestroy {

  attributes        = signal<AppAttribute[]>([]);
  selectedAttribute = signal<AppAttribute | null>(null);

  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['attrName'] && this.attributes().length > 0) {
          const found = this.attributes().find(a => a.name === params['attrName']);
          if (found) this.selectAttributeSilent(found);
        }
      });

    this.loadAttributes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChanged(term: string): void {
    if (term.length > 0) {
      this.selectedAttribute.set(null);
    }
  }

  private loadAttributes(): void {
    this.apiService.semanticApi
      .get(DEVICE_ID)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          console.error('Failed to load attributes', err);
          return of({ data: null } as ApiResponse<Semantic>); //proveri da li da menjas //notification service
        })
      )
      .subscribe((res: ApiResponse<Semantic>) => {
        if (!res.data) return;

        const mapped: AppAttribute[] = res.data.attributes.map(
          (attr: SemanticAttributeDetails) => ({
            name:     attr.name,
            path:     `${attr.parentName ?? 'Zlatko Device'}/${attr.name}`,
            aicd:     attr.description ?? '-',
            required: attr.required,
            readOnly: attr.readOnly,
            type:     attr.dataType,
            value:    attr.value ?? '-',
          })
        );
        this.attributes.set(mapped);

        const urlAttrName = this.route.snapshot.params['attrName'];
        if (urlAttrName) {
          const found = mapped.find(a => a.name === urlAttrName);
          if (found) { this.selectAttributeSilent(found); return; }
        }

        const saved = localStorage.getItem('zlatko_selectedAttr');
        if (saved) {
          const found = mapped.find(a => a.name === saved);
          if (found) { this.selectAttributeSilent(found); return; }
        }
      });
  }

  selectAttribute(attr: AppAttribute): void {
    this.router.navigate([attr.name], { relativeTo: this.route, replaceUrl: true });
    this.selectAttributeSilent(attr);
  }

  private selectAttributeSilent(attr: AppAttribute): void {
    localStorage.setItem('zlatko_selectedAttr', attr.name);
    this.selectedAttribute.set(attr);
  }
}