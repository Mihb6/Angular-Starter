import { UnitCreationDetails } from "./unit.model";

export interface ReadingType {
  guid: string;
  name: string;
  defaultUnitGuid: string;
  inUse: boolean;
  inMainContext: boolean;
  published: boolean;
}

export interface ReadingTypeCreationDto {
  guid: string;
  name: string;
  published: boolean;
  defaultUnit: UnitCreationDetails
}

export interface ReadingTypeUpdateDto {
  data: string
}
