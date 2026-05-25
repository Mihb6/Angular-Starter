import { SignInResponse } from "./authentication/authentication.model";
import { defer, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Authentication, AuthenticationClient, Authority } from "@wolkabout/commons";
import { ConfigService } from "../common/service/config.service";

export function convertToAuthentication(data: SignInResponse): Authentication {
  return {
    refreshToken: data.refreshToken,
    user: {
      id: data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email
    },
    authorities: data.accessList.map((access: any) => {
      return {
        contextId: access.contextId,
        contextName: access.contextName,
        accessToken: access.accessToken,
        active: access.active,
        permissions: access.permissions,
        roleNames: access.roles,
      } as Authority;
    })
  } as Authentication;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationClientService implements AuthenticationClient {

  private readonly baseUrl;
  private readonly tenantUrl;

  constructor(configService: ConfigService) {
    const restConfig = configService.getConfig().rest;

    if (!restConfig) {
      throw '[AuthenticationClient] - RestConfig must be provided from the application';
    }

    this.baseUrl = restConfig.baseUrl;
    this.tenantUrl = this.removeProtocolFromUrl(window.location.origin.includes('localhost') ? restConfig.baseUrl : window.location.origin);
  }

  refreshToken(token: string): Observable<Authentication> {
    return defer(async () => {
      const params = new URLSearchParams();
      params.append('url', this.tenantUrl);
      const response = await fetch(`${this.baseUrl}/api/refreshToken?${params}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: token,
      });

      const data = await response.json() as SignInResponse;
      return convertToAuthentication(data);
    });
  }

  removeProtocolFromUrl(fullUrl: string) {
    const splitUrl = fullUrl.split('//')?.[1];
    return splitUrl.replace('www.', '');
  }
}
