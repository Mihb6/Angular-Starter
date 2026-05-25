import { ReadingType } from "./reading-type.model";
import { DataType } from "../+common/data-type";

export interface Unit {
  guid: string;
  name: string;
  symbol: string | null;
  dataType: DataType;
  system: UnitSystem;
  published: boolean;
  conversionToDefault: string;
  conversionFromDefault: string;
  readingType: ReadingType;
  readingTypeGuid: string;
  readingTypeName: string;
  options: string[];
  inUse: boolean;
  inMainContext: boolean;
}

export interface UnitDetails {
  guid: string;
  name: string;
  symbol: string | null;
  dataType: DataType;
  system: UnitSystem;
  published?: boolean;
  toDefaultConversion?: string;
  fromDefaultConversion?: string;
  options: string[];
  readingTypeGuid?: string;
  readingTypeName?: string;
}

export interface UnitCreationDetails {
  guid: string;
  name: string;
  symbol: string | null;
  dataType: DataType;
  system: UnitSystem;
  options: string[];
  toDefaultConversion?: string;
  fromDefaultConversion?: string;
}

export enum UnitSystem {
  SI = 'SI',
  NON_SI = 'NON_SI',
  CUSTOM = 'CUSTOM'
}

export interface UnitQueryParameters {
  readingTypeGuid?: string;
}

export interface UnitBulkQueryParameters {
  guids: string[];
}
