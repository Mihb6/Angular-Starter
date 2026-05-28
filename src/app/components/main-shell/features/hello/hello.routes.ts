import { Route } from '@angular/router';
import { HelloComponent } from './hello.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { AttributesComponent } from './components/attributes/attributes.component';

export default [
  {
    path: '',
    component: HelloComponent,
    children: [
      {
        path: '',
        redirectTo: 'feeds',
        pathMatch: 'full'
      },
      {
        path: 'feeds',
        component: FeedsComponent,
        children: [
          {
            path: ':feedName',
            component: FeedsComponent,
          }
        ]
      },
      {
        path: 'attributes',
        component: AttributesComponent,
        children: [
          {
            path: ':attrName',
            component: AttributesComponent,
          }
        ]
      }
    ]
  }
] satisfies Route[];