import { inject, Injectable, InjectionToken } from "@angular/core";
import { RestConfigParams } from "../../rest/configuration.model";
import * as jsYaml from 'js-yaml';
import { AssetManager } from "@wolkabout/commons";

export type YamlConfig = {
  rest: RestConfigParams;
};

export const APP_NAME = 'Simulator';

export const HOST_URL = new InjectionToken<string>('HOST_URL', {
  factory: () => {
    return inject(AssetManager).getAssetLocation(APP_NAME);
  }
});


@Injectable()
export class ConfigService {

  private config: YamlConfig | null = null;

  private readonly host = inject(HOST_URL);

  async load(): Promise<void> {
    const response = await fetch(this.host + '/config/config.yaml');
    const yamlConfig = await response.text();
    this.config = jsYaml.load(yamlConfig) as YamlConfig;
  }

  getConfig(): YamlConfig {
    if (!this.config) {
      throw 'Config not loaded yet';
    }

    return this.config;
  }
}
