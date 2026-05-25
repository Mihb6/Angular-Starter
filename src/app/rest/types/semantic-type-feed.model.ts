import { Unit } from "../reading-type/unit.model";
import { DataType } from "../+common/data-type";

export interface SemanticTypeFeedQueryParameters {
  aggregatable?: boolean;
  query?: string;
  readingTypeId?: string;
  sourceType?: SourceType;
  type?: FeedType;
}

export interface SemanticTypeFeed {
  name: string;
  type: FeedType;
  sourceType: SourceType;
  dataType: DataType;
  unitGuid: string;
  unitSymbol?: string;
  unitName: string;
  readingTypeGuid: string;
  readingTypeName: string;
  retention?: number;
  precision?: number;
  categories: Range[];
  categorisationEnabled: boolean;
  semanticTypeGuid: string;
  sourceFeed?: SemanticTypeFeed;
  function?: string;
  interval?: number;
  reference?: string;
  description: string | null;
}

export enum FeedType {
  IN = 'IN',
  IN_OUT = 'IN_OUT'
}

export enum SourceType {
  DEVICE = 'DEVICE',
  SYNTHETIC = 'SYNTHETIC',
  AGGREGATION = 'AGGREGATION',
  FEED = 'FEED'
}

export enum AggregationFunction {
  AVERAGE = 'AVERAGE',
  MIN = 'MIN',
  MAX = 'MAX',
  FIRST = 'FIRST',
  LAST = 'LAST',
  COUNT = 'COUNT',
  SUM = 'SUM'
}

export const AGGREGATION_FUNCTIONS = Object.keys(AggregationFunction);

export interface Range {
  start: number;
  end: number;
  category: number;
}

export interface SemanticTypeFeedUpdateDetails {
  name: string | null;
  unitGuid: string | null;
  sourceType: SourceType | null;
  retention: number | null;
  precision: number | null;
  aggregationFunction: string | null;
  aggregationPeriod: number | null;
  reference: string | null;
  description: string | null;
  sourceName: string | null;
  type: FeedType;
}

export interface SemanticTypeFeedCreationDto {
  name: string;
  type: FeedType;
  sourceType: SourceType;
  categories: Range[];
  unitGuid: string;
  retention: number | null;
  precision: number | null;
  sourceName?: string | null;
  function?: string;
  interval?: number;
  reference?: string;
  description : string | null;
}

export interface SemanticTypeFeedBulkDeleteQueryParameters {
  guids: string[];
}

export interface UpdateCategoriesQueryParameters {
  propagate: boolean;
}
