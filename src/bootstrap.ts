import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as jsYaml from 'js-yaml';

import { default as packageJson } from "../package.json";
import { RestConfigParams } from "./app/rest/configuration.model";

export type Environment = {
  production: boolean;
  displayVersion: string;
  version: string;
  config: YamlConfig;
};

export type YamlConfig = {
  rest: RestConfigParams;
};

export const environment: Partial<Environment> = {
  production: false,
  version: packageJson.version
};

(async () => {
  console.info("Bootstrapping Starter...")

  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
})();
