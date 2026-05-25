import { User } from "../authentication/authentication.model";
import { MultiPart } from "../rest.model";
import { FeedType, Range, SourceType } from "./semantic-type-feed.model";
import { SemanticTypeAttribute } from "./semantic-type-attribute.model";
import { SemanticCreationDetails } from "../data/semantic.model";

export interface SemanticTypeQueryParameters {
  classification?: SemanticClassification;
}

export interface SemanticType {
  guid: string;
  name: string;
  description: string | null;
  classification: SemanticClassification;
  deviceType: boolean;
  published: boolean;
  creatorName: string;
  owner: User;
  canHaveChildren: boolean;
  usages: number;
  path: string;
  originId: number;
  originType: string;
  inMainContext: boolean;
}

export enum SemanticClassification {
  DATA = 'DATA',
  DEVICE = 'DEVICE',
  VIEW = 'VIEW'
}

export interface SemanticTypeUpdateDetails {
  name: string;
  description: string | null;
}

export interface SemanticTypeCreationDetails {
  name: string;
  guid?: string | null;
  description: string | null;
  canHaveChildren: boolean | null;
  classification: SemanticClassification | null;
}

export interface SemanticTypeImportTypesFromFileQueryParameters {
  file: MultiPart;
}

export interface ImportFileDto extends SemanticTypeCreationDetails {
  description: string;
  "attributes": any[],
  "feeds": any[],
}

export interface ImportExportFeed {
  name: string;
  type?: FeedType;
  sourceType?: SourceType;
  categories?: Range[];
  categorisationEnabled?: boolean;
  unitGuid?: string;
  sourceFeedName?: string;
  period?: number;
  function?: string;
  reference?: string;
  retention?: number;
  precision?: number;
}

export interface SemanticTypeImportExportDto {
  name: string;
  guid?: string;
  description?: string;
  canHaveChildren?: boolean;
  classification?: SemanticClassification;
  attributes: SemanticTypeAttribute[];
  feeds: ImportExportFeed[];
  parameters: Map<string, string>;
}

export interface TypedSemanticCreationDetails extends SemanticCreationDetails {
  attributes: Record<string, string>;
}
