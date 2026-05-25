import { Unit } from "../reading-type/unit.model";
import { AggregationFunction, FeedType, SourceType } from "../types/semantic-type-feed.model";
import { Semantic } from "./semantic.model";
import { DataType } from "../+common/data-type";

export interface Feed {
  id: number;
  name: string;
  guid: string;
  type: FeedType;
  sourceType: SourceType;
  unit: Unit;
  creationDate: number;
  categorisationEnabled: boolean;
  categories: Range[];
  typed: boolean;
  validity: number;
  retention: number | null;
  precision: number | null;
  shallowCopy: boolean;
  lastReceivedReading: Reading | null;
  lastSentReading: Reading | null;
  value: string;
  path: string;
  cacheKey: any;
  originId: number;
  originType: string;
  contextId: number;
  category: number;
  lastUpdate: number;
  semantic: Semantic
}

export interface Source {
  id: number;
  name: string;
  parentId: number;
  path: string
}

export interface SemanticFeedDetails {
  name: string;
  description: string;
  parentGuid: string;
  parentName: string;
  parentGuidPath: string;
  parentNamePath: string;
  dataFlow: FeedType;
  dataType: DataType;
  unitGuid: string;
  unitSymbol?: string;
  unitName: string;
  readingTypeGuid: string;
  readingTypeName: string;
  sourceType: SourceType;
  lastReceivedReading: Reading;
  lastSentReading: Reading;
  reference: string;
  aggregationFunction: string;
  aggregationInterval: number;
  source: FeedReference | null;
  categorisationEnabled: boolean;
  categories: Range[];
  category: number;
  retention: number;
  precision: number;
  typed: boolean;
  shallowCopy: boolean;
}

export interface FeedReference {
  semanticGuid: string;
  feedName: string;
}

export interface Range {
  start: number;
  end: number;
  category: number;
}

export interface ReadingBatch {
  semanticGuid: string;
  feedName: string;
  readings: Reading[];
}

export interface Reading {
  feedGuid: any;
  type: string;
  recordingTime: number;
  receivingTime: number;
  data: string;
}

export interface SimpleReading {
  timestamp: number;
  value: string
}

export interface SemanticFeedReadingsQueryParameters {
  from: number;
  to: number;
  typeOfReading?: 'IN' | 'OUT';
}

export interface AggregateReadingsQueryParameters {
  from: number;
  to: number;
  function: AggregationFunction;
  period: number;
}

export interface SemanticFeedMetaInScopeQueryParameters {
  name: string;
  path?: string;
  subScopeTypeGuid?: string;
}

export interface FeedMeta {
  name: string;
  semanticGuid: string;
  semanticName: string;
  path: string;
  guidPath: string;
  unitGuid: string;
  unitSymbol: string;
}

export interface FeedCreationDetails {
  name: string;
  unitGuid: string;
  sourceType: SourceType;
  dataFlow: FeedType;
  reference: string | null;
  precision: number | null;
  retention: number | null;
  function: string | null;
  interval: number | null;
  sourceFeed: FeedReference | null;
  shallowCopy: boolean | null;
  description: string;
}

export interface FeedReference {
  semanticGuid: string;
  feedName: string;
}

export interface CategoryUpdateDto {
  categories: Range[];
  categorisationEnabled: boolean;
}

export interface DownloadRawDataParams {
  fileFormat: FileFormat,
  from: number | null,
  to: number | null,
  typeOfReading: TypeOfReading,
  unitGuid: string | null
}

export enum FileFormat {
  CSV = 'CSV',
  JSON = 'JSON'
}

export enum TypeOfReading {
  IN = 'IN',
  OUT = 'OUT'
}

export interface FeedRenameDetails {
  value: string;
}
