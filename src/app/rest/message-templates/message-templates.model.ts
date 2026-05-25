import { Semantic } from "../data/semantic.model";
import { PageParameters } from "../rest.model";

export interface MessageTemplate {
  uuid: string;
  scope: Semantic;
  subject: string;
  shortMessage: string;
  fullMessage: string;
  feedFilter: string | null;
  category: number;
}

export interface UpsertMessageTemplateDto {
  scopeGuid: string;
  subject: string;
  shortMessage: string;
  fullMessage: string;
  feedFilter: string;
  category: number;
}
