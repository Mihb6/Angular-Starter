export interface Document {
  uuid: string;
  name: string;
  description: string;
  externalUrl: string | null;
  documentSource: DocumentSource;
  parentGuid: string;
  locationType: DocumentLocationType
}

export interface DocumentCreationDetails {
  name: string;
  description: string;
}

export interface DocumentUpdateDetails {
  data: string;
}

export enum DocumentSource {
  SEMANTIC = "SEMANTIC",
  TYPE = "TYPE"
}

export enum DocumentLocationType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL"
}
