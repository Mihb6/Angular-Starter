import { Component } from '@angular/core';
import { SharedModule } from "@wolkabout/commons";

export const ROUTE_NO_PERMISSIONS = 'no-permissions';

@Component({
  selector: 'app-no-permissions',
  imports: [SharedModule],
  templateUrl: './no-permissions.component.html',
  styleUrl: './no-permissions.component.scss'
})
export class NoPermissionsComponent {

}
