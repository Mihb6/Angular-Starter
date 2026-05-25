import { DataType } from "../+common/data-type";

export interface AttributeCreationDetails {
  name: string;
  description: string;
  required: boolean;
  readOnly: boolean;
  typed: boolean;
  type: DataType;
  regex: string;
  options: string;
  minSize: number;
  maxSize: number;
  value: string;
}

export interface SemanticAttributeDetails {
  name: string;
  description: string;
  value: string;
  dataType: DataType;
  lastUpdate: number;
  required: boolean;
  readOnly: boolean;
  typed: boolean;
  options: string;
  regex: string;
  parentGuid: string;
  parentName: string;
}

export interface AttributeDescriptionDetails {
  value: string;
}
