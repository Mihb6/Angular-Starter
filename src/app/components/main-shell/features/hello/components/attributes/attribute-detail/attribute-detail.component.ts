import { Component, input } from '@angular/core';
import { AppAttribute } from '../../../types';
import { InfoCardComponent } from '../../info-card/info-card.component';

@Component({
  selector: 'app-attribute-detail',
  standalone: true,
  imports: [InfoCardComponent],
  templateUrl: './attribute-detail.component.html',
  styleUrl: './attribute-detail.component.scss',
})
export class AttributeDetailComponent {
  attribute = input.required<AppAttribute | null>();
}