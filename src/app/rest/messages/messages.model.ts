import { Semantic } from "../data/semantic.model";
import { PageParameters } from "../rest.model";

export interface MessageMessagesQueryParameters {
  categories?: number[];
  query?: string;
  read?: boolean;
  scopeGuid?: string;
  since?: number;
  to?: number;
}

export interface MessageMessagesFilter extends MessageMessagesQueryParameters, PageParameters {
}

export interface Message {
  uuid: string;
  origin: Semantic;
  time: number;
  category: number;
  subject: string;
  body: string;
  fullMessage: string;
  messageRead: boolean;
}
