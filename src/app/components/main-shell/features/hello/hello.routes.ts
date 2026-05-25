import { Route } from "@angular/router";
import { HelloComponent } from "./hello.component";

export default [
  {
    path: '',
    component: HelloComponent
  },
] satisfies Route[];
