import { SemanticAttributeDetails } from "./semantic-attribute.model";
import { SemanticFeedDetails } from "./semantic-feed.model";
import { SemanticClassification } from "../types/semantic-type.model";

export interface Semantic {
  guid: string;
  name: string;
  type?: SemanticTypeDetails;
  classification: SemanticClassification;
  device: boolean;
  path: string;
  idPath: string;
  guidPath: string;
  parentId: number;
  parentGuid: string;
  updatableByUser: boolean;
  canHaveChildren: boolean;
  lastFeedUpdate: number;
  feeds: SemanticFeedDetails[];
  attributes: SemanticAttributeDetails[];
  children: Semantic[];
  description: string;
}

export interface SemanticTypeDetails {
  id: number;
  name: string;
  guid: string;
}

export interface SemanticIntegrationGetMyRootSemanticsQueryParameters {
  loadEntireHierarchy: boolean;
}

export interface SemanticIntegrationSubSemanticsQueryParameters {
  filter: string;
  typeGuid: string;
}

export interface SemanticIntegrationListQueryParameters {
  scopeGuid?: string;
  typeGuid?: string;
  filter?: string;
  guids?: string[];
  loadEntireHierarchy?: boolean;
}

export interface SemanticListQueryParameters {
  classification?: SemanticClassification;
  query?: string;
  typeGuid?: string;
}

export interface SemanticCompleteUpdateDetails {
  name: string;
  attributeUpdates: Record<string, string>;
  feedUpdates: Record<string, string>;
}

export interface SemanticUpdateDetails {
  name: string;
  description: string;
}

export interface SemanticCreationDetails {
  name: string;
  guid?: string;
  classification: SemanticClassification;
  updatableByUser?: boolean;
  canHaveChildren?: boolean;
  connectivityProperties?: Record<string, string>;
  groupGuids?: string[];
  description: string;
}
