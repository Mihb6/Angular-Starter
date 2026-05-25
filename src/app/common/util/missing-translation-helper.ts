import { MissingTranslationHandler, MissingTranslationHandlerParams } from "@ngx-translate/core";
import { Injectable } from "@angular/core";

@Injectable()
export class MissingTranslationHelper implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return params.interpolateParams ? (params.interpolateParams as any).default || params.key : params.key;
  }
}
