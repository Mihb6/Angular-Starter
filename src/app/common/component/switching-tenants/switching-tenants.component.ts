import { Component } from '@angular/core';
import { SharedModule } from "@wolkabout/commons";

export const ROUTE_SWITCHING_TENANTS = 'switching-tenants'

@Component({
  selector: 'app-switching-tenants',
  imports: [SharedModule],
  templateUrl: './switching-tenants.component.html',
  styleUrl: './switching-tenants.component.scss'
})
export class SwitchingTenantsComponent {

}
