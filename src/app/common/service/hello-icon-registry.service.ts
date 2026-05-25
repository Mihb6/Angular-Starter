import { inject, Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { HOST_URL } from "./config.service";

@Injectable()
export class HelloIconRegistry {

  private readonly matIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly host = inject(HOST_URL);

  constructor() {
    this.registerIcon('feature_platform_management', 'assets/icons/feature_platform_management.svg');
    this.registerIcon('oidc_google', 'assets/icons/oidc_google.svg');
    this.registerIcon('oidc_apple', 'assets/icons/oidc_apple.svg');
    this.registerIcon('oidc_microsoft', 'assets/icons/oidc_microsoft.svg');
    this.registerIcon('oidc_keycloak', 'assets/icons/oidc_keycloak.svg');
  }

  public registerIcon(name: string, path: string) {
    this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(this.host + '/' + path));
  }
}
